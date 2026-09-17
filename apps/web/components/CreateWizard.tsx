"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PreviewGame } from "@/components/PreviewGame";
import {
  buildOutlineSummary,
  type QuestOutlineItem,
} from "@/lib/create/buildQuestOutline";
import { previewMissionCount } from "@/lib/create/buildPreviewPack";
import {
  INTERVIEW_STEPS,
  mergeInterviewIntoDraft,
  type InterviewAnswers,
} from "@/lib/create/interview";
import { extractPaletteFromRgbSamples, INDUSTRY_PRESETS } from "@/lib/visual/presets";
import type { GamePack } from "gamepack-schema";

type Step = "interview" | "upload" | "generate" | "outline" | "preview";

const GENERATE_LABELS = [
  "문서 구조 분석…",
  "퀘스트 후보 추출 (스키마 바인딩)…",
  "GamePack 초안 조립…",
  "Zod 검증…",
];

export function CreateWizard() {
  const [step, setStep] = useState<Step>("interview");
  const [answers, setAnswers] = useState<InterviewAnswers>({
    companyName: "Aurora Widgets",
    teamName: "People Experience",
    vibe: "playful",
    focus: "culture",
  });
  const [interviewIndex, setInterviewIndex] = useState(0);
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState<string | null>(null);
  const [visualPresetId, setVisualPresetId] = useState("tech-startup");
  const [photoPalette, setPhotoPalette] = useState<[string, string, string] | undefined>();
  const [generateIndex, setGenerateIndex] = useState(0);
  const [outline, setOutline] = useState<QuestOutlineItem[] | null>(null);
  const [previewPack, setPreviewPack] = useState<GamePack | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [idempotencyKey] = useState(
    () => `idem-${typeof crypto !== "undefined" ? crypto.randomUUID() : Date.now()}`,
  );
  const [generateError, setGenerateError] = useState<string | null>(null);

  const currentInterview = INTERVIEW_STEPS[interviewIndex];

  const stepLabels = useMemo(
    () => ({
      interview:
        interviewIndex + 1 >= INTERVIEW_STEPS.length
          ? "완료"
          : `질문 ${interviewIndex + 1}/${INTERVIEW_STEPS.length}`,
      upload: uploadName ? "업로드됨" : "대기",
      generate: outline ? "완료" : step === "generate" ? "진행 중" : "대기",
      outline: previewPack ? "확인됨" : outline ? "검토" : "대기",
      preview: previewPack ? `${previewMissionCount(previewPack)} missions` : "—",
    }),
    [generateIndex, interviewIndex, outline, previewPack, step, uploadName],
  );

  async function loadSampleDocument() {
    setUploadName("fictional-onboarding.md");
    const res = await fetch("/samples/fictional-onboarding.md");
    setDocumentText(await res.text());
  }

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setUploadName(file.name);
    const buf = new Uint8Array(await file.arrayBuffer());
    setDocumentText(new TextDecoder("utf-8").decode(buf));
  }

  async function onPhotoChange(file: File | undefined) {
    if (!file || typeof document === "undefined") return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, 32, 32);
    const data = ctx.getImageData(0, 0, 32, 32).data;
    const samples: { r: number; g: number; b: number }[] = [];
    for (let i = 0; i < data.length; i += 16) {
      samples.push({ r: data[i]!, g: data[i + 1]!, b: data[i + 2]! });
    }
    setPhotoPalette(extractPaletteFromRgbSamples(samples));
    URL.revokeObjectURL(url);
  }

  async function runGenerate() {
    setGenerateError(null);
    let text = documentText;
    if (!text && uploadName === "fictional-onboarding.md") {
      const res = await fetch("/samples/fictional-onboarding.md");
      text = await res.text();
      setDocumentText(text);
    }
    if (!text) {
      setGenerateError("문서를 선택하거나 샘플을 불러오세요.");
      return;
    }

    setStep("generate");
    for (let i = 0; i < GENERATE_LABELS.length; i++) {
      setGenerateIndex(i);
      await new Promise((r) => setTimeout(r, 400));
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idempotencyKey,
        interview: answers,
        documentText: text,
        documentName: uploadName ?? "upload.md",
        visualPresetId,
        photoPalette,
      }),
    });
    const data = (await res.json()) as {
      jobId: string;
      status: string;
      error?: string;
      outline?: QuestOutlineItem[];
      pack?: GamePack | null;
    };

    if (data.status === "Failed" || !data.pack) {
      setGenerateError(data.error ?? "생성 실패");
      setStep("upload");
      return;
    }

    setJobId(data.jobId);
    setOutline(
      data.outline?.map((o) => ({
        id: o.id,
        title: o.title,
        description: o.description,
      })) ?? null,
    );
    setStep("outline");
  }

  function confirmOutline() {
    void (async () => {
      if (!jobId) return;
      const res = await fetch(`/api/generate/${jobId}`);
      const data = (await res.json()) as { pack: GamePack | null };
      if (data.pack) {
        setPreviewPack(data.pack);
        setStep("preview");
      }
    })();
  }

  return (
    <div>
      <div
        className="fq-dialogue-panel"
        data-testid="create-pii-banner"
        style={{ marginBottom: 12, fontSize: "0.85rem" }}
      >
        <strong>PII 금지</strong> · 실제 고객명·주민번호·급여·내부 URL 업로드 금지. fictional 샘플만
        사용하세요.
      </div>
      <p style={{ color: "var(--fq-muted)", fontSize: "0.9rem" }}>
        <span className="fq-badge-draft">초안 · 미발행</span> 문서 → 스키마 바인딩 생성 → HR
        리뷰 후 발행.
      </p>

      <ol className="fq-stepper" data-testid="create-steps">
        <li data-testid="create-step-interview" aria-current={step === "interview" ? "step" : undefined}>
          1. 인터뷰 · {stepLabels.interview}
        </li>
        <li data-testid="create-step-upload" aria-current={step === "upload" ? "step" : undefined}>
          2. 문서 · {stepLabels.upload}
        </li>
        <li data-testid="create-step-visual" aria-current={step === "generate" ? "step" : undefined}>
          3. AI 초안 · {stepLabels.generate}
        </li>
        <li data-testid="create-step-outline" aria-current={step === "outline" ? "step" : undefined}>
          4. 퀘스트 검토 · {stepLabels.outline}
        </li>
        <li data-testid="create-step-generate" aria-current={step === "preview" ? "step" : undefined}>
          5. 미리보기 · {stepLabels.preview}
        </li>
      </ol>

      {step === "interview" && currentInterview && (
        <section data-testid="create-interview-panel">
          <label htmlFor="interview-field">{currentInterview.prompt}</label>
          <input
            id="interview-field"
            data-testid="create-interview-input"
            value={String(answers[currentInterview.id])}
            onChange={(e) =>
              setAnswers(
                mergeInterviewIntoDraft(answers, {
                  [currentInterview.id]: e.target.value,
                } as Partial<InterviewAnswers>),
              )
            }
            style={{ display: "block", width: "100%", maxWidth: 400, marginTop: 8, padding: 8 }}
          />
          <button
            type="button"
            className="fq-btn fq-btn-play"
            style={{ marginTop: 12 }}
            data-testid="create-interview-next"
            onClick={() => {
              if (interviewIndex + 1 >= INTERVIEW_STEPS.length) {
                setStep("upload");
              } else {
                setInterviewIndex((i) => i + 1);
              }
            }}
          >
            다음
          </button>
        </section>
      )}

      {step === "upload" && (
        <section data-testid="create-upload-panel">
          <label htmlFor="visual-preset">산업 프리셋</label>
          <select
            id="visual-preset"
            data-testid="create-visual-preset"
            value={visualPresetId}
            onChange={(e) => setVisualPresetId(e.target.value)}
            style={{ display: "block", marginTop: 8, padding: 8, maxWidth: 320 }}
          >
            {INDUSTRY_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <p style={{ marginTop: 12 }}>온보딩 MD/PDF (fictional)</p>
          <input
            type="file"
            accept=".md,text/markdown,.pdf,application/pdf"
            data-testid="create-upload-input"
            onChange={(e) => void onFileChange(e.target.files?.[0])}
          />
          <p style={{ marginTop: 8, fontSize: "0.85rem" }}>선택: 사무실 사진 (팔레트 추출)</p>
          <input
            type="file"
            accept="image/*"
            data-testid="create-photo-input"
            onChange={(e) => void onPhotoChange(e.target.files?.[0])}
          />
          {generateError && (
            <p data-testid="create-generate-error" style={{ color: "#f88" }}>
              {generateError}
            </p>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              className="fq-btn fq-btn-ghost"
              data-testid="create-upload-sample"
              onClick={() => void loadSampleDocument()}
            >
              bundled sample 사용
            </button>
            <button
              type="button"
              className="fq-btn fq-btn-play"
              data-testid="create-upload-continue"
              disabled={!uploadName}
              onClick={() => void runGenerate()}
            >
              AI 초안 만들기
            </button>
          </div>
        </section>
      )}

      {step === "generate" && (
        <p data-testid="create-status">{GENERATE_LABELS[generateIndex] ?? "…"}</p>
      )}

      {step === "outline" && outline && (
        <section data-testid="create-outline-panel" className="fq-outline">
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>퀘스트 초안</h2>
          <p data-testid="create-outline-summary" style={{ color: "var(--fq-muted)", fontSize: "0.9rem" }}>
            {buildOutlineSummary(answers)}
          </p>
          <ol data-testid="create-quest-outline">
            {outline.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> — {item.description}
              </li>
            ))}
          </ol>
          <p style={{ fontSize: "0.8rem", color: "var(--fq-muted)" }}>
            각 퀘스트는 업로드 문서 chunk id(sourceRefs)와 연결됩니다.
          </p>
          <button
            type="button"
            className="fq-btn fq-btn-play"
            data-testid="create-outline-confirm"
            onClick={confirmOutline}
          >
            초안 확인 · 미리보기
          </button>
        </section>
      )}

      {step === "preview" && previewPack && jobId && (
        <section data-testid="create-preview-panel">
          <p data-testid="create-status">
            {previewMissionCount(previewPack)}개 미션 미리보기 · {previewPack.meta.title}
            <span className="fq-badge-draft">발행 전</span>
          </p>
          <PreviewGame pack={previewPack} />
          <p style={{ marginTop: 12 }}>
            <Link href={`/review/${jobId}`} className="fq-btn fq-btn-play" data-testid="create-review-link">
              HR 리뷰 · 발행 →
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}
