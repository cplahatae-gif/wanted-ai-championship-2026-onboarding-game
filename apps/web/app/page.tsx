import Link from "next/link";

export default function HomePage() {
  return (
    <main data-testid="landing-main">
      <h1>First Quest</h1>
      <p>신입 온보딩을 플레이 가능한 게임으로.</p>
      <nav aria-label="Primary">
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
