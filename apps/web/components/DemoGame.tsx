"use client";

import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type HudDetail = { done: number; total: number; title: string };

export function DemoGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hud, setHud] = useState<HudDetail>({
    done: 0,
    total: 7,
    title: "로비에서 버디 만나기",
  });
  const [introOpen, setIntroOpen] = useState(true);

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
      <p data-testid="demo-controls-hint" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        방향키 이동 · <strong>E</strong> 상호작용 · NPC에게 다가가 대화
      </p>
      {introOpen && (
        <div className="fq-dialogue-panel" data-testid="demo-dialogue-panel" role="dialog">
          <strong>루나</strong> Neulbom Labs Day 0에 온 걸 환영해! 로비에서 나를 찾아{" "}
          <strong>E</strong>를 눌러 퀘스트를 시작해.
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              className="fq-btn fq-btn-play"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              data-testid="demo-dialogue-continue"
              onClick={() => setIntroOpen(false)}
            >
              ▼ 계속
            </button>
          </div>
        </div>
      )}
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
          border: "1px solid var(--fq-border)",
        }}
      />
    </>
  );
}

export function DemoPageChrome({ children }: { children: ReactNode }) {
  return (
    <main data-testid="demo-main" style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>
      <Link href="/" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        ← First Quest
      </Link>
      <h1 style={{ margin: "8px 0" }}>Neulbom Labs</h1>
      {children}
    </main>
  );
}
