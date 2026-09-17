# Disqualifiers & exclusion risks — Wanted AI Championship 2026

**Confirmation date:** 2026-09-18  
Sources: VentureSquare 1109725 (*secondary mirror of WantedLab*), program SSOT `rules.md`

## Hard exclusion (explicit in press release)

| Risk | Source quote (paraphrase) | Mitigation for First Quest |
|------|---------------------------|----------------------------|
| **Live link fails during judging** | Service link must work during evaluation; may be **excluded from assessment** if not | Uptime on `first-quest-iota.vercel.app`; smoke cron; fix Vercel monorepo build |
| **Not a working deployed service** | Must implement and **deploy** working service | Vercel prod; no localhost-only demo for judges |
| **Copyright / license / employer rule violation** | Reuse allowed only when compliant | Fictional Neulbom; no client PII; OSS licenses in repo |

## Registration / deadline

| Risk | Detail |
|------|--------|
| Miss registration | Close **2026-09-18** — operator handles on Wanted site |
| Miss project submit | **2026-09-20** — URL + problem + AI usage + tools |

## Integrity (program policy, not legal advice)

| Risk | First Quest rule |
|------|------------------|
| Real customer secrets in repo/demo | Forbidden — Neulbom fictional only |
| Misrepresenting AI tools used | Submit doc must match actual stack (Cursor, schema validation, future LLM routes) |
| Broken vote hook / misleading landing | Hurts 20% prelim; treat as product bug |

## When official terms contradict this file

Official Wanted terms on event.wanted.co.kr supersede. Update `rules.md` + this file same commit; re-run judge loop snapshot.
