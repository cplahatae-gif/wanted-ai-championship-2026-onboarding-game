import Link from "next/link";
import { ReviewEditor } from "@/components/ReviewEditor";

type Props = { params: Promise<{ jobId: string }> };

export default async function ReviewPage({ params }: Props) {
  const { jobId } = await params;
  return (
    <main data-testid="review-page" style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <Link href="/create" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        ← 만들기
      </Link>
      <h1 style={{ margin: "8px 0" }}>HR 리뷰 · 발행 게이트</h1>
      <ReviewEditor jobId={jobId} />
    </main>
  );
}
