# Neulbom demo shell

Demo play opens `/demo` where the Phaser runtime will mount. Today it proves the route, status copy, and canvas placeholder.

## Sub-features

- `demo-route` loads Neulbom heading and status.
- `demo-canvas` exposes `[data-testid="game-canvas"]` for future interact checks.

## How to get to it (user POV)

- Choose **Neulbom 데모 플레이** on `/`.
- Or open `/demo` directly.

## Driving it with control-ui

Preconditions:

- Doctor passes.
- Phaser not required for shell verification.

- **Open demo.** Navigate to `/demo`. `[data-testid="demo-main"]` and `[data-testid="game-canvas"]` are visible.
- **Status copy.** Assert `[data-testid="demo-status"]` contains `Day 0` or updated copy from PR-02.
- **Proof.** Screenshot `[data-testid="game-canvas"]` to `.verify-artifacts/<run-id>/demo-canvas.png`.

## Gotchas

- When Phaser lands, extend this file with E key interact and mission HUD checks. Do not drop shell checks.
- Canvas size may change. Assert presence and aria-label, not pixel dimensions.
