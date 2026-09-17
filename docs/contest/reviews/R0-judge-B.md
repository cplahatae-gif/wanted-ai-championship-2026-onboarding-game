# R0 — Independent judge B

| Field | Value |
| --- | --- |
| Judge | B (separate model family from A) |
| Snapshot | `docs/contest/submissions/R0/` |
| SHA | `72e5289` (app unchanged since `54275fb`, per README) |
| Live URL | https://first-quest-iota.vercel.app |
| Played | 2026-09-18 — `/`, `/demo`, `/create` end-to-end |
| Rubric | `docs/contest/context/JUDGING.md` (official weights + named criteria). Per-criterion points are **internal heuristic only**, not Wanted math. |
| Inputs used | R0 folder, `JUDGING.md`, `JUDGE-LOOP.md` personas, `moodboard.md` + `best-practices-design.md` headers |
| Inputs not used | Other judge reports, coordinator HANDOFF, PR text |

**Verdict: REVISE**

Live-link / uptime gate is clear (`verify-log.txt`: GET `/` `/demo` `/create` → 200; re-checked live). Merge-ready fails on contest-facing hook, AI honesty, and playable juice — not on reachability.

---

## P1 — Wanted internal 80% block

Heuristic: 기획력 / 실현 가능성 / 확장성 / AI 활용 적절성 = **25 pts each**. Official FAQ names these four for 예선 and does **not** publish a split (`JUDGING.md`).

| Criterion | Score | Notes |
| --- | --- | --- |
| 기획력 | **15 / 25** | Problem is real and tight: unread onboarding PDFs, HR repeating Day-0 tours. Scripts.md 3m beat (문제→솔루션→Live→Create) is a coherent prelim story. Product does not yet *stage* that story: `/` is two unstyled links, no with/without proof row, no championship hero (`moodboard.md` B3). “우리 회사 게임 만들기” is a canned sample path, so the HR-authoring claim stays conceptual. |
| 실현 가능성 | **19 / 25** | Strongest column. Deployed web demo (권장 form), no APK/exe. `/demo` is a working Phaser slice with 7-mission HUD, keyboard move, E-interact, current-objective line. `/create` interview → bundled sample MD → “문서 파싱 중…” → **3-mission playable preview** titled from the canned company (“Aurora Widgets 플레이풀 온보딩”). Sprint 0 slice is shippable. Deduct for missing R0 `screenshots/` (JUDGE-LOOP required artifact) and for a create “생성” that is not generation. |
| 확장성 | **13 / 25** | GamePack-shaped pipeline is implied (interview + doc → mission count → Phaser pack; scripts mention Zod JSON). Stepper exists (인터뷰 / 문서 / 생성 / 미리보기). Missing the expanders that would convince a TOP20 panel: outline/blueprint before build, draft vs live, Publish, LMS/SCORM handoff, real file parse (`best-practices-design.md` B2 headers: ROSI/Learnster/Lovable/Edwiser). Scripts explicitly park async gen + HR review at PR-04+. |
| AI 활용 적절성 | **11 / 25** | Official field is “사용한 AI 툴” + how used. Paste copy claims “GamePack 생성·코드·검증 루프” and lists Cursor / Zod / “향후 LLM API PR-04”. Live create is a **bundled sample**, not an LLM. Cursor-built code is a legitimate championship pattern, but the on-site “생성” chrome overclaims. Judges who open Create after reading the form will treat this as AI-theater. |

**P1 subtotal: 58 / 100 → 46.4 / 80**

---

## P2 — Online voter 20% block

Focus: 30s hook, share urge, fun within **10s of URL load**.

| Check | Score | Notes |
| --- | --- | --- |
| 10s after URL | **4 / 10** | Canonical service link is `/`. First paint: wordmark, two sentences, two equal blue text links on white. No in-hero Phaser loop, no Play-filled CTA vs ghost Create, no guest/fictional chip as visual system (`moodboard.md` B3). `/demo` (the 30s script URL) is more honest — labeled map + moving actor in ~2s — but voters hitting the form link never see it. |
| 30s hook | **4 / 5** | Korean script is punchy and vote-shaped (“PDF 대신 플레이”, 방향키·E, Create 90초). Words outperform the page they point at. |
| Share urge | **1 / 5** | No copy-link, QR, OG/card still, vote strip. Gallery-card test at 320px would be typeset prose, not an office-RPG still (`moodboard.md` B3). |

**P2: 28 / 100 → 5.6 / 20**

예선 composite (heuristic): **52.0 / 100** (P1 46.4 + P2 5.6). Popular-vote 20% is a liability, not a boost.

---

## P3 — Final AI expert (본선 100% rehearsal)

본선 named set is 기획력, 확장성, **기술력**, **발표 전달력** (`JUDGING.md`). 실현 가능성 / AI 적절성 drop off this list.

| Criterion | Score | Notes |
| --- | --- | --- |
| 기술력 | **10 / 25** | Real Phaser runtime + HUD + create→preview data path is more than a slide. Art is primitives (checkerboard, colored squares, red circle). No dialogue panel, typewriter, or office tiles (`moodboard.md` B1). No live model in the loop. Fine as Sprint 0 engineering; not 본선 기술력. |
| 확장성 | **12 / 25** | Same architecture hint as P1; Demo Day panel will ask “who authors pack v2?” and hear “canned MD + later PR.” |
| 발표 전달력 | **13 / 25** | 3m rundown is stage-able: problem 20s → live 90s → create 50s. Operator can play `/demo` on a big screen. Tape chrome is missing (no poster frame = hero still, no QR-on-URL slide). Opening `/` on stage would kill the room. |

**P3: 35 / 75 (normalized 47 / 100)**

---

## P4 — HR buyer

| Check | Score | Notes |
| --- | --- | --- |
| Problem believability | **8 / 10** | Day-0 walkthrough fatigue is instantly credible. Fictional-employer + “실제 고객/PII 금지” is the right public-demo constraint. |
| Deployable to L&D | **3 / 10** | No Publish, no access control, no LMS transfer, no error checklist before ship (`best-practices-design.md` B2). Preview is the end state. |
| Doc → play path | **5 / 10** | Happy path works in ~90s with **bundled sample only**. File picker exists; Generate stays disabled until sample. No outline edit, no “Preview as new hire,” no split config/preview (`moodboard.md` B2). Tone/topic fields do color the preview title (“플레이풀”) — small proof that interview answers matter. |

**P4: 16 / 30 (normalized 53 / 100)**

---

## P5 — New hire player

| Check | Score | Notes |
| --- | --- | --- |
| Goal in 3 minutes | **8 / 10** | Immediate play, no login. Page HUD: “Neulbom Day 0 · 로비에서 버디 만나기 (0/7)”. In-canvas: 퀘스트 0/7, 현재 목표, “로비와 대화해 Day 0를 시작하세요.” Matches `moodboard.md` B1 “one active quest + progress channel.” |
| Controls | **6 / 10** | Footer “방향키 이동 · E 상호작용” is correct and sufficient. Keyboard-only; canvas must be focused. No tap targets for phone voters. |
| Boredom | **3 / 10** | After the first 10s the joke is the graph. Squares-as-NPCs, no WRPG bottom box / speaker plate / continue glyph (`moodboard.md` B1). Seven missions on this art direction will not hold a hire — or a voter — past mission 2. |

**P5: 17 / 30 (normalized 57 / 100)**

---

## Score rollup

| Persona | Raw | Role in First Quest loop |
| --- | --- | --- |
| P1 internal 80% | 58 / 100 (46.4 wt) | 예선 judge block |
| P2 voter 20% | 28 / 100 (5.6 wt) | 예선 vote block |
| **예선 heuristic** | **52 / 100** | Not official Wanted math |
| P3 expert | 47 / 100 | 본선 rehearsal — not in 예선 mix |
| P4 HR | 53 / 100 | Buyer sanity |
| P5 player | 57 / 100 | Hire sanity |

---

## Top 3 improvements

1. **Championship `/` + vote strip (P2 first).** One filled Play CTA (`Neulbom 데모 플레이`), ghost Create, in-hero loop or GIF of walk+E+HUD, fictional-employer chip, copy-link/QR/OG office still. Service link today loses the 20% before the game loads (`moodboard.md` B3; `best-practices-design.md` B3 contest/demo header).
2. **Stop AI-theater on `/create`.** Either run a visible generate (phase labels: 분석→퀘스트 구조→프리뷰) from the sample and show a quest outline *before* Phaser, or label the button “샘플 팩 불러오기” until PR-04 LLM exists. Form paste must match the live path (`JUDGING.md` 사용한 AI 툴; `best-practices-design.md` B2 explicit-ship / outline-first).
3. **Demo juice that survives 10s and 3 minutes.** Office tiles, one WRPG bottom dialogue panel with speaker + continue, pin the active quest; keep one progress channel. Prototype HUD copy is already better than the art (`moodboard.md` B1; IT Onboarding Simulator / Induction patterns in `best-practices-design.md` B1).

---

## Grand prix gap

대상 is a 10-second office RPG people forward to friends, plus an HR wizard that obviously used a model — R0 is a reachable prototype with a text landing and a canned pack.

---

## PASS / REVISE

**REVISE**

Not a live-link exclude. Do not treat this SHA as contest-gallery merge-ready. Re-judge when `/` can hook a voter in 10s and `/create` either performs AI or stops saying it does.
