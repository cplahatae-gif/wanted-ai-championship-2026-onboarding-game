import Link from "next/link";
import { PlayGame } from "@/components/PlayGame";

type Props = { params: Promise<{ slug: string }> };

export default async function PlayPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main data-testid="play-main" style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <Link href="/" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        ← First Quest
      </Link>
      <h1 style={{ margin: "8px 0" }}>플레이 · {slug}</h1>
      <PlayGame slug={slug} />
    </main>
  );
}
