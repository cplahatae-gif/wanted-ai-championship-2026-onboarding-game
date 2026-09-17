# Landing and navigation

Landing lets a user open First Quest home and choose Neulbom demo play or create a company onboarding game.

## Sub-features

- `landing-render` shows title and primary navigation.
- `landing-demo-cta` links to `/demo`.
- `landing-create-cta` links to `/create`.

## How to get to it (user POV)

- Open `/` in the browser.

## Driving it with control-ui

Preconditions:

- Doctor passes for `VERIFY_BASE_URL`.
- No auth required.

- **Open home.** Navigate to `/`. Run control-ui open `${VERIFY_BASE_URL}/`. Element `[data-testid="landing-main"]` is visible.
- **Demo CTA.** Click `Neulbom 데모 플레이`. Run control-ui click `[data-testid="cta-demo"]`. URL ends with `/demo` and `[data-testid="demo-main"]` is visible.
- **Return and create CTA.** Navigate back to `/`, click `우리 회사 게임 만들기`. URL ends with `/create` and `[data-testid="create-main"]` is visible.
- **HTTP smoke (fallback).** Run `./scripts/verify-first-quest-drive-landing.sh` from repo root. Exit 0 and `.verify-artifacts/<run-id>/landing.html` contains the three test ids.
- **Proof.** Save screenshot `landing.png` and `create-from-landing.png` under `.verify-artifacts/<run-id>/`.

## Gotchas

- Default dev port is **3100** so this app does not collide with other Next apps on 3000. Set `PORT` and `VERIFY_BASE_URL` together if you change it.
- Do not use production Wanted URLs for this map unless the PR explicitly targets production.
