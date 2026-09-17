# First Quest verification map

This directory is the maintained source for verifying user-facing behavior of First Quest (web). Read this index before driving the app, then open the matching feature file.

## Baseline preconditions

- Launch the web app at `http://127.0.0.1:3100` (or `VERIFY_BASE_URL`) from `apps/web` with `PORT=3100`.
- Set `VERIFY_RUN_ID` to a unique id per run so artifact dirs do not collide.
- Set `VERIFY_ARTIFACTS_DIR` to the repo-root `.verify-artifacts` unless overridden.
- Run `./scripts/verify-first-quest-doctor.sh` and require HTTP 200 on `/`, `/demo`, and `/create`.
- Prefer driving through **control-ui** (cursor-team-kit) for screenshots and clicks. Use the shell helpers when control-ui is unavailable.
- Do not kill processes by name. Stop only the dev server this run started (PID file or job control).

## Driving conventions

- Start every recipe from a healthy doctor unless preconditions say otherwise.
- Prefer `data-testid` and accessible names from this repo over CSS position.
- Capture both the action and resulting HTML or screenshot, not only exit code.
- After mutations, restore disposable state if the feature doc says so. Never delete proof artifacts during cleanup.

## Proof and skip reporting

- UI proof includes a screenshot with route visible when using control-ui.
- HTTP smoke proof includes saved HTML under `.verify-artifacts/<run-id>/`.
- Report unreachable paths with the command and unmet precondition.
- Do not claim a feature verified if only a different entry point was exercised.

## Features

- [Landing and navigation](./landing.md) covers home CTAs to demo and create.
- [Neulbom demo shell](./demo-play.md) covers `/demo` canvas placeholder until Phaser lands.
- [Create wizard shell](./create-flow.md) covers `/create` step markers until PR-03.
