# 랜딩·내비게이션

사용자가 First Quest 홈을 열고 Neulbom 데모 또는 회사 온보딩 게임 만들기로 이동한다.

## Sub-features

- `landing-render` — 제목·주 내비 표시
- `landing-demo-cta` — `/demo` 링크
- `landing-create-cta` — `/create` 링크

## How to get to it (user POV)

- 브라우저에서 `/` 를 연다.

## Driving it with control-ui

Preconditions:

- `VERIFY_BASE_URL` 에 대해 doctor 통과
- 인증 불필요

- **홈 열기.** `/` 로 이동. `[data-testid="landing-main"]` 표시.
- **데모 CTA.** `Neulbom 데모 플레이` 클릭. URL이 `/demo` 이고 `[data-testid="demo-main"]` 표시.
- **만들기 CTA.** `/` 로 돌아와 `우리 회사 게임 만들기` 클릭. URL이 `/create` 이고 `[data-testid="create-main"]` 표시.
- **HTTP 스모크 (대체).** 저장소 루트에서 `./scripts/verify-first-quest-drive-landing.sh`. 종료 0, `.verify-artifacts/<run-id>/landing.html` 에 testid 세 개 포함.
- **Proof.** `.verify-artifacts/<run-id>/` 에 `landing.png`, `create-from-landing.png` 등 저장.

## Gotchas

- 기본 dev 포트는 **3100** (3000 은 다른 Next 앱과 충돌 가능). `PORT` 와 `VERIFY_BASE_URL` 을 함께 바꾼다.
- 원티드 공개 URL 검증은 해당 PR이 production을 대상일 때만.
