export default function CreatePage() {
  return (
    <main data-testid="create-main">
      <h1>온보딩 게임 만들기</h1>
      <ol data-testid="create-steps">
        <li data-testid="create-step-interview">인터뷰</li>
        <li data-testid="create-step-upload">문서 업로드</li>
        <li data-testid="create-step-visual">비주얼</li>
        <li data-testid="create-step-generate">생성</li>
      </ol>
      <p data-testid="create-status">샘플 문서 생성 플로우는 PR-03에서 연결됩니다.</p>
    </main>
  );
}
