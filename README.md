# First Quest

Wanted AI Championship 2026 — onboarding game generator (Neulbom demo + create flow).

- **GitHub:** https://github.com/cplahatae-gif/wanted-ai-championship-2026-onboarding-game
- **Live (Vercel):** https://first-quest-iota.vercel.app

## Dev

```bash
cd apps/web && npm install && npm run dev
```

Opens http://127.0.0.1:3100 by default.

## Verify

Local (port **3100**):

```bash
export VERIFY_BASE_URL=http://127.0.0.1:3100
./scripts/verify-first-quest-doctor.sh
cd apps/web && npm run typecheck && npm test && npm run build
cd ../.. && npm test
```

- English: `.cursor/skills/verify-first-quest/SKILL.md`
- 한글: `.cursor/skills/verify-first-quest-ko/SKILL.md`

Program plan: `docs/first-quest-pstack-program.md`. Sprint 0 submit draft: `docs/submit-2026-09-20.md`.
