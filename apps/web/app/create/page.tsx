import Link from "next/link";
import { CreateWizard } from "@/components/CreateWizard";

export default function CreatePage() {
  return (
    <main data-testid="create-main" style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>
      <Link href="/" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        ← First Quest
      </Link>
      <h1 style={{ margin: "8px 0 16px" }}>온보딩 게임 만들기</h1>
      <CreateWizard />
    </main>
  );
}
