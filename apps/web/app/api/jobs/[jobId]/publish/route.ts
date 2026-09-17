import { NextResponse } from "next/server";
import { confirmAndPublish } from "@/lib/jobs/runGeneratePipeline";

type Params = { params: Promise<{ jobId: string }> };

export async function POST(request: Request, { params }: Params) {
  const { jobId } = await params;
  const body = (await request.json()) as { hrConfirmed?: boolean };
  try {
    const job = confirmAndPublish(jobId, body.hrConfirmed === true);
    if (!job) {
      return NextResponse.json({ error: "job not found" }, { status: 404 });
    }
    return NextResponse.json({
      slug: job.publishedSlug,
      playUrl: `/play/${job.publishedSlug}`,
      version: job.publishVersion,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "publish blocked" },
      { status: 400 },
    );
  }
}
