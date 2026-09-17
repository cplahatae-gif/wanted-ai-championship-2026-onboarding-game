# R0 — Independent Judge B

| Field | Value |
|-------|--------|
| Snapshot | `docs/contest/submissions/R0/` |
| Git SHA | `72e5289` |
| Production URL | https://first-quest-iota.vercel.app |
| Verified | Recurl 2026-09-18: `GET /` `200` (0.66s), `/demo` `200` (0.67s), `/create` `200` (0.66s). Matches `verify-log.txt` doctor OK. |
| Rubric SSOT | `docs/contest/context/JUDGING.md` (heuristic; not official Wanted math) |
| Inputs | Submission folder, personas P1–P5, section headers + cited patterns from `moodboard.md` / `best-practices-design.md`, live HTML via curl (no long browser session) |

**Lens:** Grok-family / URL-first. Scripts and README are rehearsal text. Scores follow what a judge or voter actually receives when they open the three routes. Heuristic points only — official FAQ names criteria, not per-criterion %.

---

## P1 — Wanted internal (예선 80% block)

Official criteria: 기획력, 실현 가능성, 확장성, AI 활용 적절성 (`JUDGING.md`). Heuristic 25 pts each.

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| 기획력 | 20 | 25 | Doc→2D RPG + fictional Neulbom Day 0 is a coherent 예선 story (B1 quest/verify). Live `/` under-sells it: generic “온보딩을 플레이 가능한 2D RPG로” instead of the scripts.md one-breath line. Championship landings (B3) want one mission sentence, not a product category. |
| 실현 가능성 | 20 | 25 | Three public routes are up; `/demo` SSR already prints `Neulbom Day 0 · 로비에서 버디 만나기 (0/7)` and a Phaser canvas slot. `/create` later steps are labeled **대기** — honest Sprint 0, not an HR upload E2E. Feasible slice, not a shippable generator. |
| 확장성 | 16 | 25 | Create `<ol>` is a 4-step scaffold (인터뷰 → 문서 업로드 → 생성 → 미리보기) that maps B2 stepper shape. No draft/live badge, publish, version chip, or export. Multi-tenant / LMS scale is script roadmap (PR-04+), not a URL property. |
| AI 활용 적절성 | 11 | 25 | 예선 FAQ scores **product** AI, not “we used Cursor.” Meta description is `Onboarding game generator` while the generate step is idle. Scripts name Zod + deferred LLM. That is an implementation loop, not “AI 활용 방식” a Wanted judge can click. |
| **Total** | **67** | **100** | |

---

## P2 — Online voter (예선 20% block)

Focus: 30s hook, share urge, fun within ~10s of URL load (`JUDGE-LOOP.md`; `moodboard.md` B3 / `best-practices-design.md` B3).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| 30s hook (message) | 16 | 25 | `scripts.md` hook (“PDF 대신 플레이”) is vote-ready. The page voters hit is two paragraphs + English meta. Hook is not shipped. |
| Fun ≤10s from `/` load | 9 | 25 | `/` is unstyled text and two `<a>`s. No in-hero loop/GIF (B3). Phaser starts only after a click; canvas is empty in the HTML. Fun is a navigation away. |
| Share / vote urge | 11 | 25 | No copy-link, QR, or one-sentence share strip (B3 vote hook). No `og:image` / `og:title`. Neulbom-only line is the sole guest-safety chip. |
| Gallery / thumb readiness | 10 | 25 | R0 folder has **no** `screenshots/`. Card image untested. Play and Create sit as equal-weight links — B3 anti-pattern (one filled Play CTA). |
| **Total** | **46** | **100** | |

---

## P3 — Final AI expert (본선 100% rehearsal)

Focus: 기술력, 확장성, 발표 전달력 (`JUDGING.md` 본선 list).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| 기술력 | 16 | 25 | Client Phaser mount + quest HUD on a public Vercel URL is real. Schema-validated GamePack and async generation are not demonstrable. A labeled “생성” step that stays 대기 will read as a stub on Demo Day (B3: tape must match the live app). |
| 확장성 | 17 | 25 | Stepper is the right skeleton for B2 draft→preview→publish. Nothing versions or promotes a pack. Same ceiling as P1, slightly kinder because the chrome exists. |
| 발표 전달력 | 18 | 25 | 3m script clock matches B3 mapping (problem → name → play → AI/scale). Opening the live `/` in a room currently starts on a wireframe, not a play. Demo Day bar is URL + QR, not a repo tour. |
| Live reliability | 23 | 25 | Independent recurl agrees with doctor: all required routes 200, ~0.7s. Meets FAQ “reachable during 심사.” Keep-alive through 10/17 still an ops risk, not an R0 defect. |
| **Total** | **74** | **100** | |

---

## P4 — HR buyer

Focus: problem believability, L&D deployability, doc→play path (`JUDGE-LOOP.md`; B2 wizard principles).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| Problem believability | 19 | 25 | Script names unread PDFs and repeated HR talk. Landing never says that pain — buyer must already believe the category. |
| Deployable to L&D | 11 | 25 | No publish, access control, SCORM/export, or analytics (B2 ROSI/Learnster/Edwiser). Not an L&D tool yet; a public prototype. |
| Doc → play path | 15 | 25 | Live wizard is more than a single form: interview 1/4, default `Aurora Widgets`, upload/generate/preview waiting. Scripts admit canned sample MD → 3-mission preview. Outline-before-codegen (B2) is not on the URL. |
| Trust / PII posture | 18 | 25 | Strongest R0 trust signal: “가상 회사 이름 (실제 고객명 금지)” on `/create` plus Neulbom-only demo copy. Missing publish-time PII lint / review gate (B2). |
| **Total** | **63** | **100** | |

---

## P5 — New hire player

Focus: controls + goal clarity in ~3 minutes, boredom check (`JUDGE-LOOP.md`; moodboard B1 HUD/dialogue).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| Control clarity | 16 | 25 | Script promises 방향키·E only (B1 IT Simulator interact). `/demo` HTML has no control legend; canvas `aria-label` only. First paint can be a blank box until JS. |
| Goal clarity (3 min) | 19 | 25 | Best shipped player affordance: status line already names the active quest and `0/7` (B1 progression strip). Goal is readable before the world is. |
| Engagement / boredom | 14 | 25 | Seven-mission counter exists. Dialogue skip, verify-step, and pacing are unverified (no play capture in R0; no screenshots). Policy-quest boredom risk stands. |
| Resume / replay | 14 | 25 | localStorage 재개 is script-only. No “이어하기” chrome in the SSR. Training replay (B1 skip-to-end) not evidenced. |
| **Total** | **63** | **100** | |

---

## Top 3 improvements (priority order)

1. **Ship the championship `/` (P2 / moodboard B3)** — One filled **Neulbom 데모 플레이** CTA, Korean one-liner from the 30s script, in-hero GIF or muted Phaser loop, guest chip, and copy/QR/OG card. Voters never open `scripts.md`. Equal-weight Play vs Create links are the current bounce.
2. **Put one visible transform on `/create`, or stop calling it a generator (P1 AI / B2)** — Show text or sample doc → editable quest outline (even canned, labeled as preview) before Phaser. Official form field is “AI 활용 방식.” Meta `Onboarding game generator` plus a 대기 generate step will be read as overclaim.
3. **First-10s player chrome on `/demo` (P5 / B1)** — Control legend (방향키·E), continue/skip affordance, and a non-empty first frame so the `0/7` HUD is not sitting over a blank canvas. Goal clarity is already there; discoverability is not.

---

## Grand prix gap (one line)

**대상권은 “링크를 연 사람이 10초 안에 플레이를 보고, Create에서 문서가 퀘스트로 바뀌는 걸 확인하는” 공개 URL인데, R0는 접속되는 3라우트 셸 + 진짜 Day 0 HUD일 뿐 첫 화면 증명과 온-URL AI가 빠져 있다.**

---

## Merge gate — PR-03 sign-off / PR-04 spawn

**REVISE**

**Rationale:** Uptime and route reachability **PASS** (FAQ exclusion risk is not the issue; freeze R0). Contest merge-ready **fails**: P2 live surface is a wireframe (46), P1 AI 적절성 is a build-tool story (11), and the program hillclimb is prelim self-score ≥90 on the P1 template plus a P2 vote hook (`JUDGE-LOOP.md`). Spawn PR-04 with ACCEPTANCE on improvements #1–#2; treat #3 as the player-path gate for the next snapshot.

---

*Judge B (Grok family) · 2026-09-18 · scored from live HTML + frozen R0 artifacts, not coordinator HANDOFF*
