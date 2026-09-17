import { NextResponse } from "next/server";
import { startOrResumeGenerate } from "@/lib/jobs/runGeneratePipeline";
import type { StartGenerateBody } from "@/lib/jobs/types";

export async function POST(request: Request) {
  const body = (await request.json()) as StartGenerateBody;
  if (!body.idempotencyKey || !body.documentText || !body.interview?.companyName) {
    return NextResponse.json({ error: "idempotencyKey, interview, documentText required" }, { status: 400 });
  }
  const job = startOrResumeGenerate(body);
  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    phaseLabel: job.phaseLabel,
    error: job.error,
    outline: job.draftPack?.quests.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      sourceRefs: q.sourceRefs ?? [],
    })),
    pack: job.status === "Ready" ? job.draftPack : null,
  });
}
