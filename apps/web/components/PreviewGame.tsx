"use client";

import type { GamePack } from "gamepack-schema";
import { useEffect, useRef } from "react";
import { GameShell } from "@/components/GameShell";

export function PreviewGame({ pack }: { pack: GamePack }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;
    void import("@/game/runtime/officeGame").then(({ mountOfficeGame }) => {
      if (containerRef.current) {
        game = mountOfficeGame(containerRef.current, pack, {
          storageKey: `preview-${pack.meta.id}`,
        });
      }
    });
    return () => game?.destroy(true);
  }, [pack]);

  return (
    <GameShell title={pack.meta.companyName} subtitle="미리보기 · 3미션" testIdPrefix="create">
      <div ref={containerRef} data-testid="create-preview-canvas" style={{ width: "100%", minHeight: 320 }} />
    </GameShell>
  );
}
