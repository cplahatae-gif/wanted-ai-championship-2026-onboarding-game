"use client";

import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { CompletionReportPanel } from "@/components/CompletionReport";
import type { CompletionReport } from "@/game/completionReport";

type HudDetail = { done: number; total: number; title: string };

export function DemoGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hud, setHud] = useState<HudDetail>({
    done: 0,
    total: 10,
    title: "로비에서 버디 만나기",
  });
  const [introOpen, setIntroOpen] = useState(true);
  const [report, setReport] = useState<CompletionReport | null>(null);
  const [audioMuted, setAudioMuted] = useState(false);

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
  }, []);

  return (
    <>
      <p data-testid="demo-status">
        Neulbom Day 0 · {hud.title} ({hud.done}/{hud.total})
      </p>
      <p data-testid="demo-controls-hint" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        방향키 이동 · <strong>E</strong> 상호작용 · 10미션 · 퀴즈 2회
      </p>
      <button
        type="button"
        className="fq-btn fq-btn-ghost"
        data-testid="demo-audio-toggle"
        style={{ fontSize: "0.8rem", padding: "4px 10px", marginTop: 4 }}
        onClick={() => setAudioMuted((m) => !m)}
      >
        BGM/SFX {audioMuted ? "켜기" : "끄기"} (데모)
      </button>
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
      {report && <CompletionReportPanel report={report} />}
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
      <Link href="/demo-3d" style={{ fontSize: "0.85rem" }} data-testid="demo-3d-link">
        3D POC →
      </Link>
      {children}
    </main>
  );
}
