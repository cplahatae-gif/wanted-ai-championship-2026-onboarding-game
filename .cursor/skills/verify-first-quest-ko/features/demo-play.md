# Neulbom 데모 셸

`/demo` 에서 Phaser 런타임이 붙을 자리다. 현재는 라우트·상태 문구·캔버스 placeholder 검증.

## Sub-features

- `demo-route` — Neulbom 제목·상태
- `demo-canvas` — `[data-testid="game-canvas"]` (이후 E키 상호작용 확장)

## How to get to it (user POV)

- `/` 에서 **Neulbom 데모 플레이**
- 또는 `/demo` 직접 접속

## Driving it with control-ui

Preconditions:

- doctor 통과
- Phaser 미연동이어도 셸 검증 가능

- **데모 열기.** `/demo`. `[data-testid="demo-main"]`, `[data-testid="game-canvas"]` 표시.
- **상태 문구.** `[data-testid="demo-status"]` 에 `Day 0` 또는 PR-02 이후 갱신 문구.
- **Proof.** `.verify-artifacts/<run-id>/demo-canvas.png`

## Gotchas

- Phaser·7미션 연동 후 이 파일에 HUD·E키·미션 클리어 검증을 **추가**한다. 셸 검증은 유지한다.
- 캔버스 크기 변경 가능. 픽셀 크기 대신 존재·aria-label 로 assert.
