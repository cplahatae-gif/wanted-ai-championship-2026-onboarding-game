import { NextResponse } from "next/server";
import type { GamePack } from "gamepack-schema";
import { updateDraftPack } from "@/lib/jobs/runGeneratePipeline";

type Params = { params: Promise<{ jobId: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { jobId } = await params;
  try {
    const body = (await request.json()) as { pack: GamePack };
    const job = updateDraftPack(jobId, body.pack);
    if (!job) {
      return NextResponse.json({ error: "job not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, pack: job.draftPack });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "invalid pack" },
      { status: 400 },
    );
  }
}
