"use client";

import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { CompletionReportPanel } from "@/components/CompletionReport";
import { GameShell } from "@/components/GameShell";
import type { CompletionReport } from "@/game/completionReport";

export function DemoGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introOpen, setIntroOpen] = useState(true);
  const [report, setReport] = useState<CompletionReport | null>(null);

  useEffect(() => {
    const pack = parseGamePack(neulbomFixture);
    let game: { destroy: (removeCanvas: boolean) => void } | undefined;

    void import("@/game/runtime/officeGame").then(({ mountOfficeGame }) => {
      if (containerRef.current) {
        game = mountOfficeGame(containerRef.current, pack);
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
  }, []);

  return (
    <GameShell
      title="Neulbom Labs"
      subtitle="Day 0 · 신입 온보딩 RPG"
      testIdPrefix="demo"
      reportPanel={report ? <CompletionReportPanel report={report} /> : undefined}
      intro={
        introOpen ? (
          <div className="fq-rpg-dialogue" data-testid="demo-dialogue-panel" role="dialog">
            <div className="fq-rpg-dialogue-name">루나</div>
            <p className="fq-rpg-dialogue-text">
              Neulbom Labs에 온 걸 환영해! 노란 ▲ 표시를 따라가며 <kbd>E</kbd>로 NPC와 대화해.
              퀘스트 10개를 클리어하면 Day 0 리포트가 열려.
            </p>
            <button
              type="button"
              className="fq-btn fq-btn-play"
              style={{ marginTop: 12, padding: "10px 20px", fontSize: "0.9rem" }}
              data-testid="demo-dialogue-continue"
              onClick={() => setIntroOpen(false)}
            >
              모험 시작
            </button>
          </div>
        ) : null
      }
    >
      <div
        ref={containerRef}
        data-testid="game-canvas"
        role="application"
        aria-label="Neulbom Labs RPG"
        style={{ width: "100%", minHeight: 360 }}
      />
    </GameShell>
  );
}

export function DemoPageChrome({ children }: { children: ReactNode }) {
  return (
    <main data-testid="demo-main" style={{ maxWidth: 1000, margin: "0 auto", padding: "16px 12px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Link href="/" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
          ← 타이틀
        </Link>
        <Link href="/demo-3d" style={{ fontSize: "0.85rem" }} data-testid="demo-3d-link">
          3D POC
        </Link>
      </div>
      {children}
    </main>
  );
}
