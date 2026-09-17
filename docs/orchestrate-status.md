# First Quest orchestrate status (Sprint 0)

Updated at program start after operator `go`.

## Predicate

PR-00 through PR-03 implemented, verified locally, pushed to origin. PR-03 awaits operator `머지 OK` before merge. Wanted submit copy in `docs/submit-2026-09-20.md`.

## PR queue

| PR | State | Head SHA | Blockers |
|----|-------|----------|----------|
| PR-00 | ready to land | (pending push) | none |
| PR-01 | ready to land | (pending push) | none |
| PR-02 | ready to land | (pending push) | none |
| PR-03 | review gate | (pending push) | operator screenshots + 머지 OK |
| PR-04+ | queued | — | after PR-03 merge |

## Standing orders snapshot

1. Neulbom fictional demo only. No real employer PII.
2. GamePack JSON + Zod SSOT.
3. Port 3100 local dev. Vercel app root `apps/web`.
4. verify-first-quest-ko after UI PRs.
5. No force-push. No PR-03 merge without operator.

## Evidence

- Doctor: `./scripts/verify-first-quest-doctor.sh` exit 0 on `http://127.0.0.1:3100`
- Unit: `npm test` root + `apps/web` (6 tests total)
- Build: `apps/web npm run build` success
- Browser: Phaser v3.90 on `/demo`, console clean after HUD fix

## Operator gate (PR-03)

Post merge-ready: landing, demo play, create preview screenshots + 30s Korean play path. Wait for `머지 OK`.

## Submit reminder (once)

Wanted registration package due **2026-09-20**. Draft copy in `docs/submit-2026-09-20.md`.
