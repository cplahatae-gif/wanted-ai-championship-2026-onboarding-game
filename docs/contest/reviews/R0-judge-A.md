# R0 — Independent Judge A

| Field | Value |
|-------|--------|
| Snapshot | `docs/contest/submissions/R0/` |
| Git SHA | `72e5289` |
| Production URL | https://first-quest-iota.vercel.app |
| Verified | `verify-log.txt` — `GET /`, `/demo`, `/create` → 200, doctor OK |
| Rubric SSOT | `docs/contest/context/JUDGING.md` (heuristic; not official Wanted math) |
| Inputs | Submission folder, personas P1–P5, skim `best-practices-design.md`, `moodboard.md` |

**Scope:** Sprint 0 frozen artifact at PR-03 sign-off. Scores infer product promise from `README.md`, `scripts.md`, and verify log only (no HANDOFF / PR text).

---

## P1 — Wanted internal (예선 80% block)

Official criteria: 기획력, 실현 가능성, 확장성, AI 활용 적절성 (`JUDGING.md`). Heuristic 25 pts each.

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| 기획력 | 22 | 25 | Problem (PDF 온보딩 → 플레이) and Neulbom Day 0 framing are coherent; GamePack → Phaser story matches B1 quest/verify patterns (Induction, IT Simulator, Hemofarm). |
| 실현 가능성 | 21 | 25 | Production routes live; 7-mission slice + HUD/resume narrated in demo script. `/create` is explicitly **canned** sample path—not yet end-to-end HR upload. |
| 확장성 | 19 | 25 | Zod JSON + multi-mission arc and planned HR review gate align with B2 draft/publish and L&D dual-artifact patterns; extension is mostly **roadmap** in R0 scripts. |
| AI 활용 적절성 | 13 | 25 | R0 admits Cursor/Zod implementation loop; **LLM API deferred to PR-04+**. For 예선, judges will expect visible AI in the **product URL**, not only in build process. |
| **Total** | **75** | **100** | |

---

## P2 — Online voter (예선 20% block)

Focus: 30s hook, share urge, fun within ~10s of URL load (`JUDGE-LOOP.md`; landing patterns `moodboard.md` B3).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| 30s hook (message) | 23 | 25 | Korean hook in `scripts.md` is tight: “PDF 대신 플레이”, controls, Create teaser. |
| Fun ≤10s from `/` load | 11 | 25 | Artifact describes landing CTAs, not in-hero play or motion; moodboard B3 expects **Play-first filled CTA** and immediate product proof—likely extra click(s) before Phaser. |
| Share / vote urge | 15 | 25 | Concept is shareable; no evidence in R0 of vote strip, OG/card still, or QR chrome for Wanted gallery. |
| Gallery / thumb readiness | 12 | 25 | No `screenshots/` in R0 folder; 16:9 office+HUD thumb untested at card scale (B3). |
| **Total** | **61** | **100** | |

---

## P3 — Final AI expert (본선 100% rehearsal)

Focus: 기술력, 확장성, 발표 전달력 (`JUDGING.md` 본선 list).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| 기술력 | 18 | 25 | Phaser slice + schema-validated GamePack is credible stack; async generation and review gates not yet demonstrable on URL. |
| 확장성 | 20 | 25 | Same as P1—architecture story strong, live surface still Sprint 0. |
| 발표 전달력 | 17 | 25 | 3m script structure is judge-friendly; Demo Day bar is **live URL + QR**, not repo walkthrough (moodboard B3)—needs polished tape aligned to `/demo`. |
| Live reliability | 22 | 25 | Doctor OK on core routes; meets FAQ “reachable during 심사” baseline. |
| **Total** | **77** | **100** | |

---

## P4 — HR buyer

Focus: problem believability, L&D deployability, doc→play path (`JUDGE-LOOP.md`).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| Problem believability | 22 | 25 | “자료는 안 읽힌다 / HR 반복 설명” matches B1 Softtek/Seppo evidence pattern. |
| Deployable to L&D | 13 | 25 | No SCORM/export, analytics, or publish workflow on URL; ROSI/Learnster-style **draft → preview → publish** still aspirational (B2). |
| Doc → play path | 14 | 25 | Create flow described as interview → sample MD → 3-mission preview; not yet doc upload + outline approval (moodboard B2). |
| Trust / PII posture | 16 | 25 | Script states PII 금지 and fictional employer—good for public vote; HR would need clearer approval gate copy on `/create`. |
| **Total** | **65** | **100** | |

---

## P5 — New hire player

Focus: controls + goal clarity in ~3 minutes, boredom check (`JUDGE-LOOP.md`).

| Criterion | Score | Max | Notes |
|-----------|------:|-----:|-------|
| Control clarity | 20 | 25 | Script promises 방향키·E only—matches IT Simulator interact pattern (B1). |
| Goal clarity (3 min) | 18 | 25 | HUD + quest progression claimed for `/demo`; R0 artifact does not include playable capture to confirm onboarding clarity. |
| Engagement / boredom | 16 | 25 | Seven-mission arc helps; policy-heavy onboarding games fail without pacing—unverified in snapshot. |
| Resume / replay | 17 | 25 | localStorage 재개 cited in demo script—good training affordance (moodboard dialogue skip/replay). |
| **Total** | **71** | **100** | |

---

## Top 3 improvements (priority order)

1. **Ship visible AI on `/create` (예선 AI 활용 적절성)** — Replace or augment canned sample with at least one on-URL step that shows document/text → structured quest outline or GamePack draft (even if human-approved), matching B2 “outline before codegen” and official form field “AI 활용 방식.”
2. **Landing vote hook (P2 / moodboard B3)** — Single filled **Play** CTA, in-hero Phaser loop or GIF, guest badge, and copy/share strip so `/` delivers fun or proof within ~10s without hunting CTAs.
3. **HR wizard chrome (P4 / B2)** — Horizontal stepper, draft vs live badge, and blocked “publish” until preview smoke test—so Create reads as L&D-trustworthy, not a dev preview.

---

## Grand prix gap (one line)

**대상권은 “URL만 열어도 AI가 HR 문서를 퀘스트로 바꾸고, 첫 화면에서 바로 플레이가 증명되는” 일체형인데, R0는 안정적인 Neulbom 플레이 슬라이스 + 미래 PR 로드맵 수준으로 예선 AI·투표 훅에서 한 단계 뒤처져 있다.**

---

## Merge gate — PR-04 spawn

**REVISE**

**Rationale:** Uptime and route verification **PASS** (safe to freeze R0 and continue production). Contest merge-ready bar is **not** met: P1 AI 적절성 and P2 first-screen delight are below the program’s own hillclimb target (`JUDGE-LOOP.md`: prelim self-score ≥90 on P1 template; P2 vote hook). PR-04 should spawn with ACCEPTANCE tied to improvements #1–#2 at minimum before treating the next wave as submission-ready.

---

*Judge A (Composer family) · 2026-09-18*
