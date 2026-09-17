export function HeroPreview() {
  return (
    <div
      data-testid="landing-hero-preview"
      aria-hidden
      style={{
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        background: "linear-gradient(180deg, #16213e 0%, #0f1419 100%)",
        border: "1px solid #2d3a4f",
        maxWidth: 420,
      }}
    >
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>
        Neulbom Day 0 · 로비에서 버디 만나기 (0/7)
      </div>
      <div
        style={{
          height: 140,
          borderRadius: 8,
          background: `
            repeating-linear-gradient(0deg, #1a1a2e 0 32px, #16213e 32px 64px),
            repeating-linear-gradient(90deg, transparent 0 32px, rgba(233,69,96,0.08) 32px 64px)
          `,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: "40%",
            width: 20,
            height: 20,
            borderRadius: 4,
            background: "#e94560",
            boxShadow: "0 0 12px rgba(233,69,96,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 12,
            bottom: 8,
            fontSize: 10,
            color: "#aee",
          }}
        >
          방향키 · E
        </div>
      </div>
    </div>
  );
}
