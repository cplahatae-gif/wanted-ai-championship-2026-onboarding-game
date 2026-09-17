# First Quest 검증 맵

First Quest 웹의 **사용자에게 보이는 동작** 검증 레시피 저장소다. 앱을 돌리기 전에 이 인덱스를 읽고, 해당 기능 파일을 연다.

## 기본 전제

- `apps/web` 에서 `PORT=3100` 으로 기동, `http://127.0.0.1:3100` (또는 `VERIFY_BASE_URL`).
- 실행마다 `VERIFY_RUN_ID` 를 다르게 두어 artifact 디렉터리가 겹치지 않게 한다.
- `VERIFY_ARTIFACTS_DIR` 기본값은 저장소 루트 `.verify-artifacts`.
- `./scripts/verify-first-quest-doctor.sh` 로 `/`, `/demo`, `/create` 가 200인지 확인한다.
- 스크린샷·클릭은 **control-ui** 우선. 없으면 셸 헬퍼.
- 프로세스 이름으로 kill 하지 않는다. 이번 run이 연 dev 서버만 종료한다.

## 구동 규칙

- doctor 통과를 전제로 각 레시피를 시작한다.
- CSS 위치보다 이 repo의 `data-testid`·접근 가능 이름을 쓴다.
- 종료 코드만이 아니라 **행동 + 결과 HTML/스크린샷**을 남긴다.
- 기능 문서에 cleanup이 있으면 일회성 상태만 되돌린다. **증거 artifact는 cleanup에서 지우지 않는다.**

## 증명·스킵 보고

- control-ui 증명에는 URL/화면이 드러난 스크린샷을 포함한다.
- HTTP 스모크는 `.verify-artifacts/<run-id>/` 아래 HTML을 보관한다.
- 전제 미충족 시 시도한 명령과 막힌 조건을 적는다.
- 다른 진입점만 돌리고 해당 기능을 검증했다고 쓰지 않는다.

## 기능 목록

- [랜딩·내비게이션](./landing.md) — 홈에서 데모·만들기 CTA
- [Neulbom 데모 셸](./demo-play.md) — `/demo` 캔버스 플레이스홀더 (Phaser 전)
- [Create 마법사 셸](./create-flow.md) — `/create` 단계 마커 (PR-03 전)
