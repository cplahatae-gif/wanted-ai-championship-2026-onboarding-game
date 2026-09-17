import { NextResponse } from "next/server";
import { getJob } from "@/lib/jobs/store";

type Params = { params: Promise<{ jobId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { jobId } = await params;
  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json({ error: "job not found" }, { status: 404 });
  }
  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    phaseLabel: job.phaseLabel,
    error: job.error,
    reviewConfirmed: job.reviewConfirmed,
    publishedSlug: job.publishedSlug,
    outline: job.draftPack?.quests.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      sourceRefs: q.sourceRefs ?? [],
    })),
    pack: job.draftPack,
  });
}
