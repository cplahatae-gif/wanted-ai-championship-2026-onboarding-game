import type { GamePack } from "gamepack-schema";
import type Phaser from "phaser";

/** catastrophi_tiles_16.png — 28×5 @16px (Phaser examples, MIT) */
export const CATA = {
  FLOOR: 68,
  FLOOR_ALT: 69,
  CARPET: 72,
  WALL: 117,
  WALL_FACE: 114,
  BLOCK: 126,
  CRATE: 125,
} as const;

const COLLISION_TILES = [CATA.WALL, CATA.WALL_FACE, CATA.BLOCK, CATA.CRATE];

export type OfficeMapBuild = {
  ground: Phaser.Tilemaps.TilemapLayer;
};

export function buildOfficeTilemap(scene: Phaser.Scene, pack: GamePack): OfficeMapBuild {
  const tw = pack.map.tileSize;
  const w = pack.map.width;
  const h = pack.map.height;

  const map = scene.make.tilemap({ tileWidth: tw, tileHeight: tw, width: w, height: h });
  const tileset = map.addTilesetImage("cata", "cata-tiles", 16, 16, 0, 0, 1);
  if (!tileset) {
    throw new Error("tileset missing");
  }

  const ground = map.createBlankLayer("ground", tileset, 0, 0, w, h)!;
  ground.setDepth(0);

  const data: number[][] = [];
  for (let y = 0; y < h; y++) {
    data[y] = [];
    for (let x = 0; x < w; x++) {
      const border = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (border) {
        data[y]![x] = CATA.WALL;
      } else if ((x + y) % 7 === 0) {
        data[y]![x] = CATA.FLOOR_ALT;
      } else {
        data[y]![x] = CATA.FLOOR;
      }
    }
  }

  const sx = pack.map.spawn.x;
  const sy = pack.map.spawn.y;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const yy = sy + dy;
      const xx = sx + dx;
      if (data[yy]?.[xx] !== undefined && data[yy]![xx] !== CATA.WALL) {
        data[yy]![xx] = CATA.CARPET;
      }
    }
  }

  for (const poi of pack.pois) {
    const px = poi.position.x;
    const py = poi.position.y;
    if (poi.id.includes("desk") && data[py]?.[px] !== CATA.WALL) {
      data[py]![px] = CATA.BLOCK;
    }
    if ((poi.id.includes("kitchen") || poi.id.includes("lab")) && data[py]?.[px] !== CATA.WALL) {
      data[py]![px] = CATA.CRATE;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      ground.putTileAt(data[y]![x]!, x, y);
    }
  }

  ground.setCollision(COLLISION_TILES);

  return { ground };
}
