"use client";

import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import { useEffect, useRef, useState } from "react";

type HudDetail = { done: number; total: number; title: string };

export function DemoGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hud, setHud] = useState<HudDetail>({
    done: 0,
    total: 7,
    title: "로비에서 버디 만나기",
  });

  useEffect(() => {
    const pack = parseGamePack(neulbomFixture);
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;

    void import("@/game/runtime/officeGame").then(({ mountOfficeGame }) => {
      if (containerRef.current) {
        game = mountOfficeGame(containerRef.current, pack);
      }
    });

    const onHud = (event: Event) => {
      setHud((event as CustomEvent<HudDetail>).detail);
    };
    window.addEventListener("first-quest-hud", onHud);
    return () => {
      window.removeEventListener("first-quest-hud", onHud);
      game?.destroy(true);
    };
  }, []);

  return (
    <>
      <p data-testid="demo-status">
        Neulbom Day 0 · {hud.title} ({hud.done}/{hud.total})
      </p>
      <div
        ref={containerRef}
        data-testid="game-canvas"
        role="img"
        aria-label="Neulbom Labs Phaser game"
        style={{
          width: "100%",
          maxWidth: 960,
          minHeight: 360,
          marginTop: 8,
          borderRadius: 8,
          overflow: "hidden",
        }}
      />
    </>
  );
}
