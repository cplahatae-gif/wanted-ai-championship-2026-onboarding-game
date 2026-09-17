export default function DemoPage() {
  return (
    <main data-testid="demo-main">
      <h1>Neulbom Labs</h1>
      <p data-testid="demo-status">Day 0 시뮬레이션 (Phaser 연동 예정)</p>
      <div
        data-testid="game-canvas"
        role="img"
        aria-label="Game canvas placeholder"
        style={{
          width: "100%",
          maxWidth: 640,
          height: 360,
          background: "#1a1a2e",
          borderRadius: 8,
        }}
      />
    </main>
  );
}
