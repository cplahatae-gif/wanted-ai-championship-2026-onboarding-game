# R0 judge synthesis — dual REVISE

SHA `b923c59` · prod https://first-quest-iota.vercel.app · 2026-09-18

| Judge | P1 (80%) | P2 (20%) | Verdict |
|-------|----------|----------|---------|
| [A](R0-judge-A.md) | 75 | 61 | REVISE |
| [B](R0-judge-B.md) (played E2E) | 58 | 28 | REVISE · 예선 heuristic **52/100** |

**Merge gate:** both REVISE → PR-04 spawn blocked until **PR-03b contest surface** lands + optional operator waiver.

## Unified ACCEPTANCE (next implementation unit)

Priority order agreed by both judges:

1. **Landing championship surface (B3)** — Single primary **Neulbom 데모 플레이** CTA, Korean hook, in-hero play proof (GIF/mini-canvas), OG/meta ko, optional guest chip. Not equal-weight bare links.
2. **Visible AI on `/create` (P1 + B2)** — Labeled preview: sample text/doc → quest outline or GamePack JSON snippet before Phaser; aligns with Wanted “AI 활용 방식.”
3. **HR wizard chrome (A #3, B2)** — Stepper states, draft badge, publish blocked until preview OK.
4. **Demo juice (B playthrough #3, P5)** — WRPG dialogue panel, office tiles, one progress channel; or honest “샘플 팩 불러오기” until LLM (stop AI-theater).

## PR sequencing

| Unit | Scope | Blocks |
|------|--------|--------|
| **PR-03b** | `apps/web` landing, demo chrome, create visible-AI shell only | 9/20 submit polish |
| **PR-04** | async generate API (program) | after PR-03b + doctor + R1 judges |

## R1 trigger

After PR-03b deploy: new `submissions/R1/`, re-run judge A + B.
