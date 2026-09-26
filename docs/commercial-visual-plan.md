# First Quest — 상용급 비주얼·게임필 계획

> 목표: 대회 심사/데모에서 **「온보딩 SaaS 데모」가 아니라 「완성된 2D RPG」** 로 읽히는 수준 (Neulbom Day 0 데모 기준).

## 품질 기준 (Definition of Done)

| 축 | 상용급 체크 |
|----|-------------|
| **아트** | CC0/라이선스 명확한 **16×16 타일셋 + 캐릭터 시트**, 픽셀 정렬, `pixelArt` 렌더, 외곽선·대비 |
| **공간** | GamePack POI/퀘스트와 **타일 의미** 일치 (로비·자리·휴게·실험·HR·퇴근) |
| **캐릭** | **사람 실루엣** NPC 4+1, 이름표, 퀘스트 마커, 대화 시 연출 |
| **게임필** | 이동·충돌·상호작용·퀘스트 팝·완료 리포트, **Web 오디오 BGM/SFX** (음소거 토글) |
| **UI** | RPG HUD (퀘스트 로그, 대화창, 힌트), 스캔라인/베zel, 모바일 FIT |
| **배포** | Vercel `/demo` cold start 후에도 동작, `verify-first-quest-doctor` 통과 |

## 페이즈

### Phase A — 에셋 파이프라인 (이번 PR)
- [x] Kenney **Tiny Town** `tilemap_packed.png` → 오피스/캠퍼스 맵
- [x] Kenney **Roguelike Characters** → 플레이어·NPC 스프라이트 (4프레임 보행)
- [x] `fetch-rpg-assets.mjs` → CC0 zip 자동 다운로드 + `ATTRIBUTION.md`
- [x] 런타임: Kenney 우선, 실패 시 `classicRetroArt` 폴백
- [ ] Git LFS/용량 검토 (현재 PNG ~20KB 수준, 커밋 가능)

### Phase B — 레벨·연출 (다음)
- Tiled `.tmj` 또는 JSON 맵 1장 (24×16) — POI 좌표와 1:1
- 가구·식물 **prop 레이어** (Tiny Town 개별 타일)
- 카메라 줌/쉐이크/파티클 튜닝, POI 라벨 최소화(타일로 읽히게)
- 대화 시 캐릭터 하이라이트·포트rait 슬롯

### Phase C — 오디오·UI 상용화
- CC0 BGM 루프 (옵션: Kenney/itch 패키지) — WebAudio oscillator 교체
- SFX: 발소리·UI·퀘스트 완료 wav
- GameShell: 폰트·다이얼로그 박스 **GBA/DS 스타일** 프레임

### Phase D — 생성·퍼블리시 게임
- `/create` 미리보기도 동일 Kenney 런타임
- visual preset → 타일 팔레트/캐릭 틴트 매핑
- 스크린샷·30초 플레이 영상 (PR-03/08 게이트)

## 기술 스택 (고정)

- Phaser 3, `pixelArt: true`, Arcade physics, 타일 16×2 = GamePack `tileSize` 32
- 에셋 경로: `public/game/kenney/*`
- 부트: `rpgBootScene` → `commercialKenneyBoot.ts` + 폴백

## 리스크

| 리스크 | 대응 |
|--------|------|
| Kenney 캐릭 **4방향 없음** (정면 roguelike) | 좌우 `flipX`, 상하 동일 프레임 + 그림자·먼지 SFX로 보행감 |
| 「사무실」 vs 「타운」 톤 | 내러티브: **Neulbom 캠퍼스/타운형 HQ**; Phase B에서 실내 타일 혼합 |
| Vercel cold start | 데mo GamePack in-memory + 정적 에셋 CDN |

## 검증

```bash
node apps/web/scripts/fetch-rpg-assets.mjs
npm run typecheck -w first-quest-web
npm run test -w first-quest-web
VERIFY_BASE_URL=https://first-quest-iota.vercel.app ./scripts/verify-first-quest-doctor.sh
```

---

**크레딧 (권장):** [Kenney](https://www.kenney.nl) — Tiny Town, Roguelike Characters (CC0)
