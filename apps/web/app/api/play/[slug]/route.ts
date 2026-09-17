import { NextResponse } from "next/server";
import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import { getPublishedPack } from "@/lib/jobs/store";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  if (slug === "neulbom") {
    return NextResponse.json({ pack: parseGamePack(neulbomFixture) });
  }
  const pack = getPublishedPack(slug);
  if (!pack) {
    return NextResponse.json(
      { error: "slug not found (cold start may reset demo publishes — re-publish from /review)" },
      { status: 404 },
    );
  }
  return NextResponse.json({ pack });
}
