# Submission snapshot R0 — Sprint 0 / PR-03 sign-off

| Field | Value |
|-------|--------|
| Git SHA | `72e5289` (branch `main`; app unchanged since `54275fb`) |
| Production URL | https://first-quest-iota.vercel.app |
| Captured | 2026-09-18 KST |
| Purpose | Judge loop fixed artifact (see `docs/contest/JUDGE-LOOP.md`) |

## Verify

```bash
export VERIFY_BASE_URL=https://first-quest-iota.vercel.app
./scripts/verify-first-quest-doctor.sh
```

See `verify-log.txt` in this folder.

## Routes

- `/` — landing CTAs
- `/demo` — Neulbom seven-mission Phaser slice
- `/create` — interview → sample doc → 3-mission preview

## Rubric SSOT

`docs/contest/context/JUDGING.md` (official landing + terms, 2026-09-18)
