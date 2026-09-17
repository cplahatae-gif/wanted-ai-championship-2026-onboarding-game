import Link from "next/link";

export function HeroPreview() {
  return (
    <div data-testid="landing-hero-preview">
      <div
        style={{
          padding: "10px 14px",
          background: "#312e81",
          borderBottom: "3px solid #0f172a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="fq-font-game" style={{ color: "#fde68a", fontSize: "1rem" }}>
          Neulbom Day 0
        </span>
        <span style={{ fontSize: "0.75rem", color: "#a5b4fc" }}>LIVE PREVIEW</span>
      </div>
      <div className="fq-pixel-scene">
        <div className="fq-pixel-floor" />
        <div
          style={{
            position: "absolute",
            left: "60%",
            top: "35%",
            width: 24,
            height: 24,
            background: "#3b82f6",
            border: "2px solid #0f172a",
            borderRadius: 4,
          }}
        />
        <div className="fq-pixel-player" />
        <div
          style={{
            position: "absolute",
            right: 8,
            bottom: 8,
            fontSize: 10,
            color: "#94a3b8",
          }}
        >
          ↑↓←→ · E
        </div>
      </div>
      <div style={{ padding: 12, textAlign: "center" }}>
        <Link
          href="/demo"
          className="fq-btn fq-btn-play fq-font-game"
          style={{ width: "100%", fontSize: "1.1rem" }}
        >
          ▶ 1분 플레이
        </Link>
      </div>
    </div>
  );
}
