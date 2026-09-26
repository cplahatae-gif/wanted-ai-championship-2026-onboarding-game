/** Tile indices for Kenney Tiny Town `tilemap_packed.png` (16×16, 12×11 grid). */
export const KENNEY_T = {
  /** 잔디 — 휴게·캠퍼스 */
  GRASS: 0,
  /** 밝은 돌길 — 복도 */
  PATH: 108,
  /** 회색 바닥 — 오픈 오피스 */
  FLOOR: 109,
  /** 돌 패턴 — 구역 구분 */
  FLOOR2: 24,
  /** 어두운 벽/울 */
  WALL: 17,
  /** 책상·가구 느낌 타일 */
  DESK: 50,
  /** 파티션/울 */
  PARTITION: 61,
  /** 휴게(잔디+길) */
  BREAK: 0,
  /** 실험실(차가운 바닥) */
  LAB: 38,
  /** 리셉션(밝은 길) */
  RECEPTION: 26,
} as const;

export const KENNEY_TILE_COLLISION = [
  KENNEY_T.WALL,
  KENNEY_T.DESK,
  KENNEY_T.PARTITION,
] as number[];
