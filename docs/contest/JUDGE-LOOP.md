# Judge loop — First Quest Grand Prix

**Purpose:** Separate **production** sessions from **scoring** sessions. Every merge-ready wave gets a frozen submission snapshot and two independent judge reports.

**Rubric SSOT:** `docs/contest/context/JUDGING.md`  
**Personas:** below (do not paste implementation HANDOFF into judge prompts)

## Personas (score independently)

| ID | Lens | Weights / focus |
|----|------|-----------------|
| P1 | **Wanted internal (80% block)** | 기획력, 실현 가능성, 확장성, AI 적절성 — 25 pts each |
| P2 | **Online voter (20% block)** | 30s hook, share urge, fun within 10s of URL load |
| P3 | **Final AI expert** | 기술력, 확장성, 발표 전달력 (Demo Day rehearsal) |
| P4 | **HR buyer** | Problem believability, deployable to L&D, doc→play path |
| P5 | **New hire player** | Controls + goal clarity in 3 minutes, boredom check |

## Fixed submission artifact (`docs/contest/submissions/R<n>/`)

Create **before** each judge pair runs.

| File | Content |
|------|---------|
| `README.md` | Git SHA, Vercel URL, date, how to verify (no secrets) |
| `verify-log.txt` | Output of `verify-first-quest-doctor.sh` on that SHA |
| `screenshots/` | Landing, demo HUD, create preview (paths only in git if large) |
| `scripts.md` | 30s vote hook + 3m demo script (Korean) |

**R0** = Sprint 0 head at PR-03 sign-off (current program target).

## Judge run (two agents, different model families)

**Inputs allowed:** fixed submission folder, `JUDGING.md`, persona card, `best-practices-design.md` + `moodboard.md` citations request.

**Forbidden:** prior judge scores, coordinator HANDOFF, PR description alone.

**Outputs:**

- `docs/contest/reviews/R<n>-judge-A.md`
- `docs/contest/reviews/R<n>-judge-B.md`

Each report must include:

1. Scores per persona section (use tables)  
2. **Top 3 improvements** (priority ordered)  
3. **Grand prix gap** — one line  
4. PASS / REVISE for merge-ready (REVISE default)

**Merge gate:** both PASS on same SHA **or** operator waiver in chat (`preferences.md`).

## Coordinator actions after judges

1. Map top-3 items → next PR brief **ACCEPTANCE** bullets  
2. Append row to `orchestrate/first-quest/decisions.tsv`  
3. Update `units.tsv` frontier  
4. Hillclimb on **P2 vote hook** until prelim self-score ≥90 on P1 template

## Tick (30m / program MD)

1. Re-read `JUDGING.md` + this file  
2. Re-verify latest Vercel URL  
3. If SHA changed, new `R<n>` folder + re-judge  
4. Refresh open PR briefs only (no spawn during hold)

## R0 trigger (resume)

When production `/demo` and `/create` return 200 with Sprint 0 UI on `first-quest-iota.vercel.app`:

- Capture `submissions/R0/`  
- Spawn judge A (Composer family) + judge B (Grok family)  
- Stop for operator PR-03 sign-off if REVISE on feasibility/uptime
