import type { GamePack } from "gamepack-schema";
import type Phaser from "phaser";

function hex(n: string): number {
  return parseInt(n.replace("#", ""), 16);
}

export function registerOfficeTextures(scene: Phaser.Scene, pack: GamePack): void {
  const [floorC, wallC, accentC] = pack.visual.palette.map(hex);
  const tile = pack.map.tileSize;

  const floor = scene.make.graphics({}, false);
  floor.fillStyle(floorC, 1);
  floor.fillRect(0, 0, tile, tile);
  floor.fillStyle(accentC, 0.12);
  floor.fillRect(2, 2, tile - 4, tile - 4);
  floor.lineStyle(1, wallC, 0.25);
  floor.strokeRect(0, 0, tile, tile);
  floor.generateTexture("tile-floor", tile, tile);
  floor.destroy();

  const wall = scene.make.graphics({}, false);
  wall.fillStyle(wallC, 1);
  wall.fillRect(0, 0, tile, tile);
  wall.fillStyle(0xffffff, 0.08);
  wall.fillRect(2, 2, tile - 4, 8);
  wall.generateTexture("tile-wall", tile, tile);
  wall.destroy();

  const rug = scene.make.graphics({}, false);
  rug.fillStyle(accentC, 0.35);
  rug.fillRoundedRect(0, 0, tile * 2, tile * 2, 6);
  rug.lineStyle(2, accentC, 0.8);
  rug.strokeRoundedRect(1, 1, tile * 2 - 2, tile * 2 - 2, 6);
  rug.generateTexture("tile-rug", tile * 2, tile * 2);
  rug.destroy();

  const desk = scene.make.graphics({}, false);
  desk.fillStyle(0x6b4f3a, 1);
  desk.fillRect(4, 12, 24, 14);
  desk.fillStyle(0x8b6914, 1);
  desk.fillRect(6, 6, 20, 8);
  desk.fillStyle(0x334155, 1);
  desk.fillRect(10, 8, 12, 5);
  desk.generateTexture("prop-desk", 32, 32);
  desk.destroy();

  const plant = scene.make.graphics({}, false);
  plant.fillStyle(0x4a3728, 1);
  plant.fillRect(12, 22, 8, 10);
  plant.fillStyle(0x22c55e, 1);
  plant.fillCircle(16, 14, 10);
  plant.fillStyle(0x16a34a, 1);
  plant.fillCircle(12, 16, 6);
  plant.fillCircle(20, 16, 6);
  plant.generateTexture("prop-plant", 32, 32);
  plant.destroy();

  const playerSheet = scene.make.graphics({}, false);
  const drawPlayer = (ox: number, oy: number, legOffset: number) => {
    playerSheet.fillStyle(0x1e293b, 1);
    playerSheet.fillRect(ox + 10, oy + 22 + legOffset, 4, 6);
    playerSheet.fillRect(ox + 18, oy + 22 - legOffset, 4, 6);
    playerSheet.fillStyle(accentC, 1);
    playerSheet.fillRoundedRect(ox + 8, oy + 12, 16, 12, 3);
    playerSheet.fillStyle(0xffdbac, 1);
    playerSheet.fillCircle(ox + 16, oy + 8, 7);
    playerSheet.fillStyle(0x334155, 1);
    playerSheet.fillRect(ox + 10, oy + 4, 12, 5);
  };
  for (let f = 0; f < 4; f++) {
    drawPlayer(f * 32, 0, f % 2 === 0 ? 0 : 2);
  }
  playerSheet.generateTexture("player-sheet", 128, 32);
  playerSheet.destroy();

  const npcG = scene.make.graphics({}, false);
  npcG.fillStyle(0x3b82f6, 1);
  npcG.fillRoundedRect(8, 14, 16, 14, 3);
  npcG.fillStyle(0xffdbac, 1);
  npcG.fillCircle(16, 10, 7);
  npcG.fillStyle(0x6366f1, 1);
  npcG.fillRect(10, 2, 12, 6);
  npcG.generateTexture("npc-human", 32, 32);
  npcG.destroy();

  const kiosk = scene.make.graphics({}, false);
  kiosk.fillStyle(0x475569, 1);
  kiosk.fillRect(4, 4, 24, 26);
  kiosk.fillStyle(0x38bdf8, 1);
  kiosk.fillRect(8, 8, 16, 12);
  kiosk.fillStyle(0xfbbf24, 1);
  kiosk.fillRect(12, 22, 8, 4);
  kiosk.generateTexture("npc-kiosk", 32, 32);
  kiosk.destroy();

  const marker = scene.make.graphics({}, false);
  marker.fillStyle(0xfbbf24, 1);
  marker.fillTriangle(8, 0, 16, 14, 0, 14);
  marker.lineStyle(2, 0xffffff, 1);
  marker.strokeTriangle(8, 0, 16, 14, 0, 14);
  marker.generateTexture("quest-marker", 16, 16);
  marker.destroy();

  const sparkle = scene.make.graphics({}, false);
  sparkle.fillStyle(0xffffff, 1);
  sparkle.fillCircle(4, 4, 4);
  sparkle.generateTexture("particle-spark", 8, 8);
  sparkle.destroy();
}

export function npcTextureKey(npcId: string): string {
  return npcId.includes("security") ? "npc-kiosk" : "npc-human";
}
