# Orchestrate hold — Grand Prix replan (2026-09-18)

## Hold status

**ACTIVE.** All in-flight implementation workers stand down (zero-writes). Merged work and pushed `main` remain.

## North star

Wanted AI Championship 2026 **대상(1팀)**. 예선 TOP20 + 본선에서 기획·기술·발표 전달력 상위.

## What stays shipped

- `main` through `8b8e839`: Sprint 0 code (GamePack, Neulbom Phaser `/demo`, Create preview, submit draft).
- Local verify: doctor + unit tests pass on port 3100.
- Vercel `first-quest`: production alias regressed during monorepo deploy experiments; **infra track paused** until project install/build SSOT (`npm ci` at repo root) is confirmed green.

## Blocked until research lands

- PR-04+ spawn
- UI polish PRs without moodboard citation
- Judge loop scored reviews without `docs/contest/context/JUDGING.md`

## Parallel research (in flight)

| Track | Owner | Deliverables |
|-------|--------|--------------|
| R | subagent | `docs/contest/context/rules.md`, `JUDGING.md`, `DISQUALIFIERS.md` |
| B1 | subagent | onboarding / serious game refs → best-practices |
| B2 | subagent | AI wizard → preview → publish UX |
| B3 | subagent | hackathon / award URL patterns |

## Resume predicate

1. Track R + B files committed.
2. `docs/contest/JUDGE-LOOP.md` + program addendum + `preferences.md` updated.
3. Vercel production `/demo` + `/create` HTTP 200 with Sprint 0 UI (infra fix if needed).
4. Coordinator drains inbox and spawns PR-04 brief with judge gaps in ACCEPTANCE.

Store: `/Users/hatae/.cursor/projects/Volumes-Ha-tae-00-00/orchestrate/first-quest/`
