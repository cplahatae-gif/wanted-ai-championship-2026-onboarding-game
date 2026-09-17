import { safeParseGamePack } from "gamepack-schema";
import { chunkMarkdown } from "@/lib/ingest/chunkDocument";
import { buildGamePackFromIngest } from "@/lib/generate/buildPackFromJob";
import { slugFromCompany } from "@/lib/generate/buildPackFromJob";
import { findJobByIdempotency, getJob, publishPack, saveJob } from "./store";
import type { GenerateJobRecord, StartGenerateBody } from "./types";

function newJobId(): string {
  return `job_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function startOrResumeGenerate(body: StartGenerateBody): GenerateJobRecord {
  const existing = findJobByIdempotency(body.idempotencyKey);
  if (existing?.status === "Ready" && existing.draftPack) {
    return existing;
  }

  const now = Date.now();
  let job: GenerateJobRecord =
    existing ??
    ({
      id: newJobId(),
      idempotencyKey: body.idempotencyKey,
      status: "Parsing",
      phaseLabel: "문서 구조 분석…",
      interview: body.interview,
      visualPresetId: body.visualPresetId ?? "tech-startup",
      documentName: body.documentName,
      pack: null,
      draftPack: null,
      reviewConfirmed: false,
      publishedSlug: null,
      publishVersion: 0,
      error: null,
      createdAt: now,
      updatedAt: now,
    } satisfies GenerateJobRecord);

  try {
    job.status = "Parsing";
    job.phaseLabel = "문서 구조 분석…";
    job.updatedAt = Date.now();
    saveJob(job);

    const chunks = chunkMarkdown(body.documentText);

    job.status = "Structuring";
    job.phaseLabel = "퀘스트 후보 추출 (스키마 바인딩)…";
    job.updatedAt = Date.now();
    saveJob(job);

    const draftPack = buildGamePackFromIngest({
      interview: body.interview,
      chunks,
      visualPresetId: job.visualPresetId,
      photoPalette: body.photoPalette,
    });

    job.status = "Validating";
    job.phaseLabel = "Zod 검증…";
    job.updatedAt = Date.now();
    saveJob(job);

    const parsed = safeParseGamePack(draftPack);
    if (!parsed.success) {
      job.status = "Failed";
      job.error = parsed.error.issues.map((i) => i.message).join("; ");
      job.updatedAt = Date.now();
      saveJob(job);
      return job;
    }

    job.draftPack = parsed.data;
    job.pack = parsed.data;
    job.status = "Ready";
    job.phaseLabel = "Ready";
    job.error = null;
    job.updatedAt = Date.now();
    saveJob(job);
    return job;
  } catch (err) {
    job.status = "Failed";
    job.error = err instanceof Error ? err.message : "생성 실패";
    job.updatedAt = Date.now();
    saveJob(job);
    return job;
  }
}

export function updateDraftPack(jobId: string, draftPack: GenerateJobRecord["draftPack"]): GenerateJobRecord | undefined {
  const job = getJob(jobId);
  if (!job || !draftPack) return undefined;
  const parsed = safeParseGamePack(draftPack);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join("; "));
  }
  job.draftPack = parsed.data;
  job.pack = parsed.data;
  job.reviewConfirmed = false;
  job.updatedAt = Date.now();
  saveJob(job);
  return job;
}

export function confirmAndPublish(jobId: string, hrConfirmed: boolean): GenerateJobRecord | undefined {
  const job = getJob(jobId);
  if (!job?.draftPack) return undefined;
  if (!hrConfirmed) {
    throw new Error("HR 확인 체크 없이는 발행할 수 없습니다.");
  }
  job.reviewConfirmed = true;
  job.publishVersion += 1;
  const slug = `${slugFromCompany(job.interview.companyName)}-v${job.publishVersion}`;
  job.publishedSlug = slug;
  job.updatedAt = Date.now();
  saveJob(job);
  publishPack(slug, job.draftPack, job.publishVersion);
  return job;
}
