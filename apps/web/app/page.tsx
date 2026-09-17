import Link from "next/link";
import { HeroPreview } from "@/components/HeroPreview";
import { ShareStrip } from "@/components/ShareStrip";

export default function HomePage() {
  return (
    <main className="fq-landing" data-testid="landing-main">
      <div className="fq-landing-hero">
        <div>
          <span className="fq-chip">Wanted AI Championship 2026</span>
          <h1 className="fq-font-game" style={{ fontSize: "2.4rem", margin: "12px 0", lineHeight: 1.2 }}>
            First Quest
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#c4b5fd", margin: "0 0 8px" }}>
            HR 온보딩을 <strong style={{ color: "var(--fq-gold)" }}>2D RPG</strong>로 플레이하세요
          </p>
          <p style={{ color: "var(--fq-muted)", maxWidth: 440, margin: "0 0 20px", fontSize: "0.95rem" }}>
            PPT·PDF 대신 신입이 캐릭터를 조종해 Day 0 퀘스트를 클리어합니다. 지금 Neulbom Labs
            10미션 데모를 바로 실행할 수 있습니다.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/demo" className="fq-btn fq-btn-play fq-font-game" data-testid="cta-demo">
              ▶ START GAME
            </Link>
            <Link href="/create" className="fq-btn fq-btn-ghost" data-testid="cta-create">
              우리 회사 팩 만들기
            </Link>
          </div>
          <ShareStrip />
        </div>

        <div className="fq-landing-poster">
          <HeroPreview />
        </div>
      </div>
    </main>
  );
}
