"use client";

import type { GamePack } from "gamepack-schema";
import { useEffect, useRef, useState } from "react";
import { CompletionReportPanel } from "@/components/CompletionReport";
import type { CompletionReport } from "@/game/completionReport";

type HudDetail = { done: number; total: number; title: string };

export function PlayGame({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pack, setPack] = useState<GamePack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hud, setHud] = useState<HudDetail>({ done: 0, total: 0, title: "…" });
  const [report, setReport] = useState<CompletionReport | null>(null);

  useEffect(() => {
    void fetch(`/api/play/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("pack not found");
        return (await res.json()) as { pack: GamePack };
      })
      .then((data) => setPack(data.pack))
      .catch(() => setError("게임 팩을 불러오지 못했습니다. 다시 발행하거나 /demo를 이용하세요."));
  }, [slug]);

  useEffect(() => {
    if (!pack || !containerRef.current) return;
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;
    const storageKey = `play-${slug}`;

    void import("@/game/runtime/officeGame").then(({ mountOfficeGame }) => {
      if (containerRef.current) {
        game = mountOfficeGame(containerRef.current, pack, { storageKey });
      }
    });

    const onHud = (event: Event) => {
      setHud((event as CustomEvent<HudDetail>).detail);
    };
    const onComplete = (event: Event) => {
      setReport((event as CustomEvent<CompletionReport>).detail);
    };
    window.addEventListener("first-quest-hud", onHud);
    window.addEventListener("first-quest-complete", onComplete);
    return () => {
      window.removeEventListener("first-quest-hud", onHud);
      window.removeEventListener("first-quest-complete", onComplete);
      game?.destroy(true);
    };
  }, [pack, slug]);

  if (error) {
    return <p data-testid="play-error">{error}</p>;
  }
  if (!pack) {
    return <p data-testid="play-loading">로딩…</p>;
  }

  return (
    <>
      <p data-testid="play-status">
        {pack.meta.title} · {hud.title} ({hud.done}/{hud.total})
      </p>
      <div
        ref={containerRef}
        data-testid="play-canvas"
        style={{ width: "100%", maxWidth: 960, minHeight: 360, marginTop: 8 }}
      />
      {report && <CompletionReportPanel report={report} />}
    </>
  );
}
