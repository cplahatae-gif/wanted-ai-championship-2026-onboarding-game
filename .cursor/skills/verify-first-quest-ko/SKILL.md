---
name: verify-first-quest-ko
description: First Quest Next.js 웹(랜딩, /demo, /create)을 control-ui 또는 HTTP 스모크 스크립트로 검증한다. apps/web·게임 라우트 PR 머지 전, pstack live 레인에서 브라우저 증거가 필요할 때 사용.
---

# First Quest 검증

영문 canonical 스킬은 `.cursor/skills/verify-first-quest/`. 스크립트·testid·경로는 동일하다.

## 기동 (Launch)

저장소 루트에서:

```bash
cd apps/web && npm install && PORT=3100 npm run dev
```

기본 포트 **3100**은 다른 Next 앱(3000)과 충돌하지 않게 한다.

준비 완료는 `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3100/demo` 가 `200`일 때.

환경 변수:

```bash
export PORT=3100 VERIFY_BASE_URL=http://127.0.0.1:3100
```

종료는 **이번에 켠 dev 서버만** (Ctrl+C 또는 기록한 PID). `pkill node` 금지.

## Doctor (사전 점검)

```bash
export VERIFY_BASE_URL=http://127.0.0.1:3100
./scripts/verify-first-quest-doctor.sh
```

종료 코드 0, `GET /`, `/demo`, `/create` 모두 HTTP 200.

## Drive (구동·시나리오)

1순위는 cursor-team-kit **control-ui**(브라우저).  
`.cursor/skills/verify-first-quest-ko/features/README.md` 와 해당 기능 파일을 읽고 검증할 변경에 맞는 레시피를 따른다.

브라우저 없을 때 HTTP 스모크:

```bash
export VERIFY_RUN_ID=manual-smoke
./scripts/verify-first-quest-drive-landing.sh
```

안정 셀렉터 (`apps/web/app/**`):

- `[data-testid="landing-main"]`, `cta-demo`, `cta-create`
- `[data-testid="demo-main"]`, `game-canvas`, `demo-status`
- `[data-testid="create-main"]`, `create-steps`, `create-step-interview`

## Evidence (증거)

`.verify-artifacts/<VERIFY_RUN_ID>/` 에 저장한다. 실제 사용자 경로(이동 → 클릭 → 결과 확인)로 증명한다. HTTP 스모크는 HTML 파일, control-ui는 기능 id 기준 스크린샷.

빌드 성공만으로 통과 처리하지 않는다. feature map에 없는 테스트 전용 라우트는 쓰지 않는다.

## Cleanup (정리)

기동한 dev 서버만 중지. 임시 env는 해제. **현재 run id의 `.verify-artifacts/` 는 삭제하지 않는다.**

## Helpers (스크립트)

| 스크립트 | 용도 |
|----------|------|
| `./scripts/verify-first-quest-doctor.sh` | 준비 상태 확인 |
| `./scripts/verify-first-quest-drive-landing.sh` | 랜딩 HTML 스모크 |

최초 1회: `chmod +x scripts/verify-first-quest-*.sh`

라우트·UI가 바뀌면 `/maintain-verification-skill` 로 feature map을 갱신한다.
