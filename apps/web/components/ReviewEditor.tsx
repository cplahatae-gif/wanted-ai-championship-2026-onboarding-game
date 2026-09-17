"use client";

import type { GamePack } from "gamepack-schema";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function ReviewEditor({ jobId }: { jobId: string }) {
  const [pack, setPack] = useState<GamePack | null>(null);
  const [hrConfirmed, setHrConfirmed] = useState(false);
  const [publishResult, setPublishResult] = useState<{ slug: string; playUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/generate/${jobId}`);
    if (!res.ok) {
      setError("job을 찾을 수 없습니다.");
      return;
    }
    const data = (await res.json()) as { pack: GamePack | null; error?: string };
    if (data.pack) setPack(data.pack);
    else setError(data.error ?? "초안 없음");
  }, [jobId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function saveDraft() {
    if (!pack) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/jobs/${jobId}/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack }),
    });
    setSaving(false);
    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      setError(body.error ?? "저장 실패");
    }
  }

  async function publish() {
    setError(null);
    const res = await fetch(`/api/jobs/${jobId}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hrConfirmed }),
    });
    const body = (await res.json()) as { slug?: string; playUrl?: string; error?: string };
    if (!res.ok) {
      setError(body.error ?? "발행 차단");
      return;
    }
    if (body.slug && body.playUrl) {
      setPublishResult({ slug: body.slug, playUrl: body.playUrl });
    }
  }

  function updateQuestTitle(index: number, title: string) {
    if (!pack) return;
    const quests = [...pack.quests];
    const q = quests[index];
    if (!q) return;
    quests[index] = { ...q, title };
    setPack({ ...pack, quests });
  }

  if (error && !pack) {
    return <p data-testid="review-error">{error}</p>;
  }

  if (!pack) {
    return <p data-testid="review-loading">HR 리뷰 로딩…</p>;
  }

  return (
    <div data-testid="review-main">
      <p style={{ color: "var(--fq-muted)", fontSize: "0.9rem" }}>
        <span className="fq-badge-draft">초안</span> 발행 전 퀘스트·대사를 검수하세요. 자동 발행 없음.
      </p>
      <ol data-testid="review-quest-list">
        {pack.quests.map((q, i) => (
          <li key={q.id} style={{ marginBottom: 12 }}>
            <input
              data-testid={`review-quest-title-${q.id}`}
              value={q.title}
              onChange={(e) => updateQuestTitle(i, e.target.value)}
              style={{ width: "100%", maxWidth: 480, padding: 8 }}
            />
            <p style={{ fontSize: "0.8rem", color: "var(--fq-muted)", margin: "4px 0" }}>
              {q.description}
              {q.sourceRefs?.length ? ` · 근거: ${q.sourceRefs.join(", ")}` : null}
            </p>
          </li>
        ))}
      </ol>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        <button
          type="button"
          className="fq-btn fq-btn-ghost"
          data-testid="review-save-draft"
          disabled={saving}
          onClick={() => void saveDraft()}
        >
          초안 저장
        </button>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem" }}>
          <input
            type="checkbox"
            data-testid="review-hr-confirm"
            checked={hrConfirmed}
            onChange={(e) => setHrConfirmed(e.target.checked)}
          />
          HR 최종 확인 (실제 고객/PII 없음)
        </label>
        <button
          type="button"
          className="fq-btn fq-btn-play"
          data-testid="review-publish"
          onClick={() => void publish()}
        >
          발행
        </button>
      </div>
      {error && (
        <p data-testid="review-block-message" style={{ color: "#f88", marginTop: 8 }}>
          {error}
        </p>
      )}
      {publishResult && (
        <p data-testid="review-publish-success" style={{ marginTop: 12 }}>
          발행됨 ·{" "}
          <Link href={publishResult.playUrl} data-testid="review-play-link">
            {publishResult.playUrl}
          </Link>
        </p>
      )}
    </div>
  );
}
