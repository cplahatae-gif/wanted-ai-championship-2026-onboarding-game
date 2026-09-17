import Link from "next/link";
import { HeroPreview } from "@/components/HeroPreview";
import { ShareStrip } from "@/components/ShareStrip";

export default function HomePage() {
  return (
    <main
      data-testid="landing-main"
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "32px 24px 48px",
      }}
    >
      <span className="fq-chip">Wanted AI Championship 2026 · First Quest</span>
      <h1 style={{ fontSize: "2rem", margin: "12px 0 8px", lineHeight: 1.25 }}>
        HR 온보딩을
        <br />
        <span style={{ color: "var(--fq-play)" }}>플레이 가능한 2D RPG</span>
        로
      </h1>
      <p style={{ color: "var(--fq-muted)", maxWidth: 520, margin: "0 0 20px" }}>
        신입 첫날, 슬라이드 대신 Neulbom Labs Day 0를 직접 플레이하세요. 문서·인터뷰로
        우리 회사 버전 초안도 만들 수 있습니다.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Link href="/demo" className="fq-btn fq-btn-play" data-testid="cta-demo">
          Neulbom 데모 플레이
        </Link>
        <Link href="/create" className="fq-btn fq-btn-ghost" data-testid="cta-create">
          우리 회사 게임 만들기
        </Link>
      </div>

      <HeroPreview />
      <ShareStrip />
    </main>
  );
}
