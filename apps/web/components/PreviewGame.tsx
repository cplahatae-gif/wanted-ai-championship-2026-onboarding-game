"use client";

import type { GamePack } from "gamepack-schema";
import { useEffect, useRef } from "react";

export function PreviewGame({ pack }: { pack: GamePack }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;
    void import("@/game/runtime/officeGame").then(({ mountOfficeGame }) => {
      if (containerRef.current) {
        game = mountOfficeGame(containerRef.current, pack);
      }
    });
    return () => game?.destroy(true);
  }, [pack]);

  return (
    <div
      ref={containerRef}
      data-testid="create-preview-canvas"
      style={{ width: "100%", maxWidth: 960, minHeight: 320, marginTop: 12 }}
    />
  );
}
