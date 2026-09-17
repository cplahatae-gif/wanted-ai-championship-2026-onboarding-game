import { CreateWizard } from "@/components/CreateWizard";

export default function CreatePage() {
  return (
    <main data-testid="create-main">
      <h1>온보딩 게임 만들기</h1>
      <CreateWizard />
    </main>
  );
}
