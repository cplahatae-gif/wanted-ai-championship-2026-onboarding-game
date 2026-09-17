# Create wizard shell

Create flow opens `/create` with step markers for interview, upload, visual, and generate. Full wizard behavior arrives in PR-03.

## Sub-features

- `create-steps` lists four labeled steps.
- `create-status` shows pipeline readiness message.

## How to get to it (user POV)

- Choose **우리 회사 게임 만들기** on `/`.
- Or open `/create` directly.

## Driving it with control-ui

Preconditions:

- Doctor passes.

- **Open create.** Navigate to `/create`. `[data-testid="create-main"]` is visible.
- **Steps.** Assert `[data-testid="create-step-interview"]` through `[data-testid="create-step-generate"]` exist.
- **Proof.** Screenshot `.verify-artifacts/<run-id>/create-shell.png`.

## Gotchas

- After PR-03, replace shell checks with sample MD upload and preview play. Update this file in the same PR.
