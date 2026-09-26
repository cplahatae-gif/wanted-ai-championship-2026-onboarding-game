import type { GamePack } from "gamepack-schema";
import type Phaser from "phaser";
import { T, TILE_COLLISION } from "./classicRetroArt";

export type OfficeMapBuild = {
  ground: Phaser.Tilemaps.TilemapLayer;
};

export function buildOfficeTilemap(scene: Phaser.Scene, pack: GamePack): OfficeMapBuild {
  const tw = 16;
  const displayScale = 2;
  const w = pack.map.width;
  const h = pack.map.height;

  const map = scene.make.tilemap({ tileWidth: tw, tileHeight: tw, width: w, height: h });
  const tileset = map.addTilesetImage("classic", "classic-tiles", 16, 16, 0, 0, 1);
  if (!tileset) {
    throw new Error("classic tileset missing");
  }

  const ground = map.createBlankLayer("ground", tileset, 0, 0, w, h)!;
  ground.setScale(displayScale);
  ground.setDepth(0);

  const data: number[][] = [];
  for (let y = 0; y < h; y++) {
    data[y] = [];
    for (let x = 0; x < w; x++) {
      const border = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (border) data[y]![x] = T.WALL;
      else if (x >= 10 && x <= 14 && y >= 4 && y <= 8) data[y]![x] = T.PARTITION;
      else if (x % 5 === 0 && y > 2 && y < h - 2) data[y]![x] = T.FLOOR2;
      else data[y]![x] = T.FLOOR;
    }
  }

  const { x: sx, y: sy } = pack.map.spawn;
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const yy = sy + dy;
      const xx = sx + dx;
      if (data[yy]?.[xx] !== undefined && data[yy]![xx] !== T.WALL) {
        data[yy]![xx] = T.RECEPTION;
      }
    }
  }

  for (const poi of pack.pois) {
    const px = poi.position.x;
    const py = poi.position.y;
    if (data[py]?.[px] === T.WALL) continue;
    if (poi.id.includes("desk")) data[py]![px] = T.DESK;
    if (poi.id.includes("kitchen")) data[py]![px] = T.BREAK;
    if (poi.id.includes("lab")) data[py]![px] = T.LAB;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      ground.putTileAt(data[y]![x]!, x, y);
    }
  }

  ground.setCollision(TILE_COLLISION);

  return { ground };
}
