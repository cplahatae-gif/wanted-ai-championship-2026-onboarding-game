# Create 마법사 셸

`/create` 에 인터뷰·업로드·비주얼·생성 단계 마커가 있다. PR-03에서 샘플 문서·미리보기 플로우가 연결된다.

## Sub-features

- `create-steps` — 네 단계 라벨
- `create-status` — 파이프라인 준비 메시지

## How to get to it (user POV)

- `/` 에서 **우리 회사 게임 만들기**
- 또는 `/create` 직접

## Driving it with control-ui

Preconditions:

- doctor 통과

- **Create 열기.** `/create`. `[data-testid="create-main"]` 표시.
- **단계.** `[data-testid="create-step-interview"]` ~ `[data-testid="create-step-generate"]` 존재.
- **Proof.** `.verify-artifacts/<run-id>/create-shell.png`

## Gotchas

- PR-03 이후 샘플 MD 업로드·preview play 검증으로 **이 파일을 같은 PR에서 갱신**한다.
