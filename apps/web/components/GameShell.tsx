"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type HudDetail = { done: number; total: number; title: string; description?: string };
type DialoguePayload = {
  speaker: string;
  text: string;
  choices?: { id: string; text: string }[];
};
type InteractHint = { label: string; visible: boolean };

export function GameShell({
  title,
  subtitle,
  children,
  intro,
  reportPanel,
  testIdPrefix = "game",
  statusPrefix = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  intro?: ReactNode;
  reportPanel?: ReactNode;
  testIdPrefix?: string;
  statusPrefix?: string;
}) {
  const [hud, setHud] = useState<HudDetail>({ done: 0, total: 10, title: "…" });
  const [dialogue, setDialogue] = useState<DialoguePayload | null>(null);
  const [hint, setHint] = useState<InteractHint>({ label: "", visible: false });
  const [questPop, setQuestPop] = useState<string | null>(null);

  useEffect(() => {
    const onHud = (e: Event) => setHud((e as CustomEvent<HudDetail>).detail);
    const onDialogue = (e: Event) => {
      const d = (e as CustomEvent<DialoguePayload | null>).detail;
      setDialogue(d);
    };
    const onHint = (e: Event) => setHint((e as CustomEvent<InteractHint>).detail);
    const onPop = (e: Event) => {
      const t = (e as CustomEvent<{ title: string }>).detail.title;
      setQuestPop(t);
      window.setTimeout(() => setQuestPop(null), 2200);
    };
    const onKey = (e: KeyboardEvent) => {
      if (!dialogue?.choices?.length) return;
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < dialogue.choices.length) {
        window.dispatchEvent(new CustomEvent("first-quest-dialogue-pick", { detail: { index: idx } }));
      }
    };

    window.addEventListener("first-quest-hud", onHud);
    window.addEventListener("first-quest-dialogue", onDialogue);
    window.addEventListener("first-quest-interact-hint", onHint);
    window.addEventListener("first-quest-quest-pop", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("first-quest-hud", onHud);
      window.removeEventListener("first-quest-dialogue", onDialogue);
      window.removeEventListener("first-quest-interact-hint", onHint);
      window.removeEventListener("first-quest-quest-pop", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [dialogue]);

  function pickChoice(index: number) {
    window.dispatchEvent(new CustomEvent("first-quest-dialogue-pick", { detail: { index } }));
  }

  return (
    <div className="fq-game-shell" data-testid={`${testIdPrefix}-shell`}>
      <header className="fq-game-header">
        <div>
          <h1 className="fq-game-title">{title}</h1>
          {subtitle && <p className="fq-game-subtitle">{subtitle}</p>}
        </div>
        <div className="fq-game-xp" data-testid={`${testIdPrefix}-status`}>
          <span className="fq-game-xp-label">QUEST</span>
          <div className="fq-game-xp-bar">
            <div
              className="fq-game-xp-fill"
              style={{ width: `${hud.total ? (hud.done / hud.total) * 100 : 0}%` }}
            />
          </div>
          <span className="fq-game-xp-text">
            {statusPrefix}
            {hud.done}/{hud.total}
          </span>
        </div>
      </header>

      <div className="fq-game-body">
        <aside className="fq-quest-log" data-testid={`${testIdPrefix}-quest-log`}>
          <div className="fq-quest-log-head">퀘스트 로그</div>
          <p className="fq-quest-active">{hud.title}</p>
          {hud.description && <p className="fq-quest-desc">{hud.description}</p>}
          <p className="fq-quest-controls">↑↓←→ 이동 · <kbd>E</kbd> 대화/조사</p>
        </aside>

        <div className="fq-game-viewport-wrap">
          {questPop && <div className="fq-quest-pop">퀘스트 완료! {questPop}</div>}
          {hint.visible && (
            <div className="fq-interact-hint" data-testid={`${testIdPrefix}-interact-hint`}>
              <kbd>E</kbd> {hint.label}
            </div>
          )}
          {children}
        </div>
      </div>

      {intro}
      {dialogue && (
        <div className="fq-rpg-dialogue" data-testid={`${testIdPrefix}-dialogue-panel`} role="dialog">
          <div className="fq-rpg-dialogue-name">{dialogue.speaker}</div>
          <p className="fq-rpg-dialogue-text">{dialogue.text}</p>
          {dialogue.choices && dialogue.choices.length > 0 && (
            <ul className="fq-rpg-choices">
              {dialogue.choices.map((c, i) => (
                <li key={c.id}>
                  <button type="button" onClick={() => pickChoice(i)}>
                    [{i + 1}] {c.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {reportPanel}
    </div>
  );
}
