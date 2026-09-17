import Link from "next/link";

export default function HomePage() {
  return (
    <main data-testid="landing-main" style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1>First Quest</h1>
      <p>HR 인터뷰와 문서를 바탕으로 신입 온보딩을 플레이 가능한 2D RPG로 만듭니다.</p>
      <p>공개 데모는 가상의 <strong>Neulbom Labs</strong>만 사용합니다.</p>
      <nav aria-label="Primary" style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Link href="/demo" data-testid="cta-demo">
          Neulbom 데모 플레이
        </Link>
        <Link href="/create" data-testid="cta-create">
          우리 회사 게임 만들기
        </Link>
      </nav>
    </main>
  );
}
