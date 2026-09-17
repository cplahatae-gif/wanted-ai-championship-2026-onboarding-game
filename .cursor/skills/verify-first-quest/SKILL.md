---
name: verify-first-quest
description: Drive the First Quest Next.js web app (landing, /demo, /create) via control-ui or HTTP smoke scripts. Use before merging PRs that touch apps/web or game routes, and when pstack live lanes need browser proof.
---

# Verify First Quest

Korean guide: `.cursor/skills/verify-first-quest-ko/SKILL.md` (same scripts and selectors).

## Launch

From repo root:

```bash
cd apps/web && npm install && PORT=3100 npm run dev
```

Default port **3100** avoids colliding with other local Next apps on 3000.

Ready when `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3100/demo` prints `200`.

Override:

```bash
export PORT=3100 VERIFY_BASE_URL=http://127.0.0.1:3100
```

Teardown only the server you started (foreground Ctrl+C, or kill the recorded PID). Do not `pkill node`.

## Doctor

```bash
export VERIFY_BASE_URL=http://127.0.0.1:3100
./scripts/verify-first-quest-doctor.sh
```

Requires exit 0 and `GET /`, `/demo`, `/create` all `200`.

## Drive

Primary harness is **control-ui** from cursor-team-kit (browser). Read `.cursor/skills/verify-first-quest/features/README.md` and the feature file for the change under test.

Fallback HTTP smoke (no browser):

```bash
export VERIFY_RUN_ID=manual-smoke
./scripts/verify-first-quest-drive-landing.sh
```

Stable selectors in `apps/web/app/**`:

- `[data-testid="landing-main"]`, `cta-demo`, `cta-create`
- `[data-testid="demo-main"]`, `game-canvas`, `demo-status`
- `[data-testid="create-main"]`, `create-steps`, `create-step-interview`

## Evidence

Write artifacts under `.verify-artifacts/<VERIFY_RUN_ID>/`. Proof must follow a real user path (navigate, click, see result). For HTTP smoke, keep saved HTML. For control-ui, keep screenshots named by feature id.

Do not treat build success alone as proof. Do not use test-only routes unless documented in the feature map.

## Cleanup

Stop the dev server you started. Remove temporary env vars. Do **not** delete `.verify-artifacts/` for the current run id.

## Helpers

| Script | Purpose |
|--------|---------|
| `./scripts/verify-first-quest-doctor.sh` | Readiness check |
| `./scripts/verify-first-quest-drive-landing.sh` | Landing HTML smoke |

Make executable once: `chmod +x scripts/verify-first-quest-*.sh`

Maintenance when routes change: `/maintain-verification-skill`
