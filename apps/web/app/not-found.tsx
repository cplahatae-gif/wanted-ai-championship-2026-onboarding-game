import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link href="/">First Quest 홈</Link>
    </main>
  );
}
