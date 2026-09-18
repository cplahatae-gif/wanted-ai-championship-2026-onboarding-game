import type { GamePack } from "gamepack-schema";
import type Phaser from "phaser";
import { OFFICE_TILE, officeCollisionTiles } from "./officeHumanSprites";

export type OfficeMapBuild = {
  ground: Phaser.Tilemaps.TilemapLayer;
  props: Phaser.GameObjects.Group;
};

export function buildOfficeTilemap(scene: Phaser.Scene, pack: GamePack): OfficeMapBuild {
  const tw = pack.map.tileSize;
  const w = pack.map.width;
  const h = pack.map.height;

  const map = scene.make.tilemap({ tileWidth: tw, tileHeight: tw, width: w, height: h });
  const tileset = map.addTilesetImage("office", "office-tiles", 32, 32, 0, 0, 1);
  if (!tileset) {
    throw new Error("office tileset missing");
  }

  const ground = map.createBlankLayer("ground", tileset, 0, 0, w, h)!;
  ground.setDepth(0);

  const data: number[][] = [];
  for (let y = 0; y < h; y++) {
    data[y] = [];
    for (let x = 0; x < w; x++) {
      const border = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (border) {
        data[y]![x] = OFFICE_TILE.WALL;
      } else if (x >= 10 && x <= 14 && y >= 4 && y <= 8) {
        data[y]![x] = OFFICE_TILE.PARTITION;
      } else if (x % 6 === 0 && y > 2 && y < h - 2) {
        data[y]![x] = OFFICE_TILE.CARPET_STRIP;
      } else {
        data[y]![x] = OFFICE_TILE.CARPET;
      }
    }
  }

  const sx = pack.map.spawn.x;
  const sy = pack.map.spawn.y;
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const yy = sy + dy;
      const xx = sx + dx;
      if (data[yy]?.[xx] !== undefined && data[yy]![xx] !== OFFICE_TILE.WALL) {
        data[yy]![xx] = OFFICE_TILE.RECEPTION;
      }
    }
  }

  for (const poi of pack.pois) {
    const px = poi.position.x;
    const py = poi.position.y;
    if (poi.id.includes("desk") && data[py]?.[px] !== OFFICE_TILE.WALL) {
      data[py]![px] = OFFICE_TILE.DESK;
    }
    if (poi.id.includes("kitchen") && data[py]?.[px] !== OFFICE_TILE.WALL) {
      data[py]![px] = OFFICE_TILE.BREAK;
    }
    if (poi.id.includes("lab") && data[py]?.[px] !== OFFICE_TILE.WALL) {
      data[py]![px] = OFFICE_TILE.LAB;
    }
    if (poi.id.includes("hr") && data[py]?.[px] !== OFFICE_TILE.WALL) {
      data[py]![px] = OFFICE_TILE.CARPET_STRIP;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      ground.putTileAt(data[y]![x]!, x, y);
    }
  }

  ground.setCollision(officeCollisionTiles());

  const props = scene.add.group();
  for (const poi of pack.pois) {
    const px = poi.position.x * tw;
    const py = poi.position.y * tw;
    if (poi.id.includes("desk")) {
      const d = scene.add.image(px, py, "prop-desk-lg");
      d.setDepth(py);
      props.add(d);
    }
    if (poi.id.includes("kitchen") || poi.id.includes("lab")) {
      const p = scene.add.image(px, py - 4, "prop-plant-lg");
      p.setDepth(py);
      props.add(p);
    }
  }

  return { ground, props };
}
