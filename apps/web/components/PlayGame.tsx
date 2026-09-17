"use client";

import type { GamePack } from "gamepack-schema";
import { useEffect, useRef, useState } from "react";
import { CompletionReportPanel } from "@/components/CompletionReport";
import { GameShell } from "@/components/GameShell";
import type { CompletionReport } from "@/game/completionReport";

export function PlayGame({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pack, setPack] = useState<GamePack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<CompletionReport | null>(null);

  useEffect(() => {
    void fetch(`/api/play/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("pack not found");
        return (await res.json()) as { pack: GamePack };
      })
      .then((data) => setPack(data.pack))
      .catch(() => setError("게임 팩을 불러오지 못했습니다."));
  }, [slug]);

  useEffect(() => {
    if (!pack || !containerRef.current) return;
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;

    void import("@/game/runtime/officeGame").then(({ mountOfficeGame }) => {
      if (containerRef.current) {
        game = mountOfficeGame(containerRef.current, pack, { storageKey: `play-${slug}` });
      }
    });

    const onComplete = (event: Event) => {
      setReport((event as CustomEvent<CompletionReport>).detail);
    };
    window.addEventListener("first-quest-complete", onComplete);
    return () => {
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
    <GameShell
      title={pack.meta.title}
      subtitle="발행된 온보딩 RPG"
      testIdPrefix="play"
      reportPanel={report ? <CompletionReportPanel report={report} /> : undefined}
    >
      <div ref={containerRef} data-testid="play-canvas" style={{ width: "100%", minHeight: 360 }} />
    </GameShell>
  );
}
