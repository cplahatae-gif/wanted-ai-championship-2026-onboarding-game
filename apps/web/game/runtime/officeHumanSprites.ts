import type Phaser from "phaser";

export type WalkDir = "down" | "up" | "left" | "right";

export const OFFICE_TILE = {
  CARPET: 0,
  CARPET_STRIP: 1,
  WALL: 2,
  DESK: 3,
  PARTITION: 4,
  BREAK: 5,
  LAB: 6,
  RECEPTION: 7,
} as const;

const COLLISION_OFFICE = [
  OFFICE_TILE.WALL,
  OFFICE_TILE.DESK,
  OFFICE_TILE.PARTITION,
];

export function officeCollisionTiles(): number[] {
  return [...COLLISION_OFFICE];
}

export function dirFromVelocity(vx: number, vy: number, last: WalkDir): WalkDir {
  if (vx === 0 && vy === 0) return last;
  if (Math.abs(vx) > Math.abs(vy)) return vx > 0 ? "right" : "left";
  return vy > 0 ? "down" : "up";
}

export function humanFrameIndex(dir: WalkDir, walkFrame: number): number {
  const row = { down: 0, up: 1, left: 2, right: 3 }[dir];
  return row * 4 + (walkFrame % 4);
}

function drawHumanFrame(
  g: Phaser.GameObjects.Graphics,
  ox: number,
  oy: number,
  dir: WalkDir,
  frame: number,
  shirt: number,
  pants: number,
  skin: number,
  hair: number,
) {
  const leg = frame % 2 === 0 ? 0 : 2;
  g.fillStyle(pants, 1);
  if (dir === "down") {
    g.fillRect(ox + 12, oy + 28 + leg, 4, 8);
    g.fillRect(ox + 16, oy + 28 - leg, 4, 8);
  } else if (dir === "up") {
    g.fillRect(ox + 12, oy + 28 + leg, 4, 8);
    g.fillRect(ox + 16, oy + 28 - leg, 4, 8);
  } else if (dir === "left") {
    g.fillRect(ox + 10, oy + 28 + leg, 4, 8);
    g.fillRect(ox + 14, oy + 28 - leg, 4, 8);
  } else {
    g.fillRect(ox + 14, oy + 28 + leg, 4, 8);
    g.fillRect(ox + 18, oy + 28 - leg, 4, 8);
  }

  g.fillStyle(shirt, 1);
  if (dir === "down") {
    g.fillRoundedRect(ox + 10, oy + 18, 12, 12, 2);
  } else if (dir === "up") {
    g.fillRoundedRect(ox + 10, oy + 18, 12, 12, 2);
  } else {
    g.fillRoundedRect(ox + 9, oy + 18, 14, 12, 2);
  }

  g.fillStyle(skin, 1);
  if (dir === "down") {
    g.fillCircle(ox + 16, oy + 12, 6);
    g.fillStyle(hair, 1);
    g.fillCircle(ox + 16, oy + 9, 6);
    g.fillStyle(0x1a1a1a, 1);
    g.fillCircle(ox + 14, oy + 12, 1);
    g.fillCircle(ox + 18, oy + 12, 1);
  } else if (dir === "up") {
    g.fillStyle(hair, 1);
    g.fillCircle(ox + 16, oy + 11, 7);
  } else if (dir === "left") {
    g.fillCircle(ox + 13, oy + 12, 5);
    g.fillStyle(hair, 1);
    g.fillRect(ox + 8, oy + 6, 10, 6);
    g.fillStyle(0x1a1a1a, 1);
    g.fillCircle(ox + 12, oy + 12, 1);
  } else {
    g.fillCircle(ox + 19, oy + 12, 5);
    g.fillStyle(hair, 1);
    g.fillRect(ox + 14, oy + 6, 10, 6);
    g.fillStyle(0x1a1a1a, 1);
    g.fillCircle(ox + 20, oy + 12, 1);
  }
}

export function registerHumanSheet(
  scene: Phaser.Scene,
  key: string,
  shirt: number,
  pants = 0x334155,
  skin = 0xffdbac,
  hair = 0x3d2314,
): void {
  const fw = 32;
  const fh = 48;
  const g = scene.make.graphics({}, false);
  const dirs: WalkDir[] = ["down", "up", "left", "right"];
  dirs.forEach((dir, row) => {
    for (let f = 0; f < 4; f++) {
      drawHumanFrame(g, f * fw, row * fh, dir, f, shirt, pants, skin, hair);
    }
  });
  g.generateTexture(key, fw * 4, fh * 4);
  g.destroy();

  const tex = scene.textures.get(key);
  for (let i = 0; i < 16; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const name = `${i}`;
    if (!tex.has(name)) {
      tex.add(name, 0, col * fw, row * fh, fw, fh);
    }
  }
}

export function registerOfficeEnvironment(scene: Phaser.Scene): void {
  const tw = 32;
  const g = scene.make.graphics({}, false);

  const ox = (index: number) => index * tw;

  g.fillStyle(0xc9c4bc, 1);
  g.fillRect(ox(OFFICE_TILE.CARPET), 0, tw, tw);
  g.fillStyle(0xb8b2a8, 0.35);
  g.fillRect(ox(OFFICE_TILE.CARPET) + 2, 2, tw - 4, tw - 4);

  g.fillStyle(0xb8b2a8, 1);
  g.fillRect(ox(OFFICE_TILE.CARPET_STRIP), 0, tw, tw);
  for (let x = 0; x < tw; x += 4) {
    g.fillStyle(0xa59e94, 1);
    g.fillRect(ox(OFFICE_TILE.CARPET_STRIP) + x, 0, 2, tw);
  }

  g.fillStyle(0xe8e6e3, 1);
  g.fillRect(ox(OFFICE_TILE.WALL), 0, tw, tw);
  g.lineStyle(2, 0xd1cdc7, 1);
  g.strokeRect(ox(OFFICE_TILE.WALL), 0, tw, tw);
  g.fillStyle(0xf5f3f0, 1);
  g.fillRect(ox(OFFICE_TILE.WALL) + 2, tw - 8, tw - 4, 6);

  g.fillStyle(0xc9c4bc, 1);
  g.fillRect(ox(OFFICE_TILE.DESK), 0, tw, tw);
  g.fillStyle(0x8b6914, 1);
  g.fillRect(ox(OFFICE_TILE.DESK) + 2, 4, tw - 4, tw - 10);
  g.fillStyle(0x64748b, 1);
  g.fillRect(ox(OFFICE_TILE.DESK) + 6, 8, tw - 12, 8);

  g.fillStyle(0xc9c4bc, 1);
  g.fillRect(ox(OFFICE_TILE.PARTITION), 0, tw, tw);
  g.fillStyle(0x94a3b8, 1);
  g.fillRect(ox(OFFICE_TILE.PARTITION) + 4, 0, tw - 8, tw);
  g.fillStyle(0xcbd5e1, 0.5);
  g.fillRect(ox(OFFICE_TILE.PARTITION) + 6, 2, tw - 12, tw - 4);

  g.fillStyle(0xd4e4d4, 1);
  g.fillRect(ox(OFFICE_TILE.BREAK), 0, tw, tw);
  g.fillStyle(0xa7c4a7, 0.4);
  g.fillCircle(ox(OFFICE_TILE.BREAK) + 16, 16, 8);

  g.fillStyle(0xdce8f0, 1);
  g.fillRect(ox(OFFICE_TILE.LAB), 0, tw, tw);
  g.fillStyle(0x7dd3fc, 0.35);
  g.fillRect(ox(OFFICE_TILE.LAB) + 4, 4, tw - 8, tw - 8);

  g.fillStyle(0xc9c4bc, 1);
  g.fillRect(ox(OFFICE_TILE.RECEPTION), 0, tw, tw);
  g.lineStyle(2, 0x14b8a6, 0.8);
  g.strokeRect(ox(OFFICE_TILE.RECEPTION) + 3, 3, tw - 6, tw - 6);

  g.generateTexture("office-tiles", tw * 8, tw);
  g.destroy();

  const desk = scene.make.graphics({}, false);
  desk.fillStyle(0x8b6914, 1);
  desk.fillRect(4, 14, 24, 12);
  desk.fillStyle(0x64748b, 1);
  desk.fillRect(8, 8, 16, 8);
  desk.fillStyle(0x1e293b, 1);
  desk.fillRect(10, 10, 12, 5);
  desk.generateTexture("prop-desk-lg", 32, 32);
  desk.destroy();

  const plant = scene.make.graphics({}, false);
  plant.fillStyle(0x78716c, 1);
  plant.fillRect(12, 22, 8, 10);
  plant.fillStyle(0x22c55e, 1);
  plant.fillCircle(16, 14, 11);
  plant.fillStyle(0x16a34a, 1);
  plant.fillCircle(12, 16, 7);
  plant.fillCircle(20, 16, 7);
  plant.generateTexture("prop-plant-lg", 32, 32);
  plant.destroy();

  const kiosk = scene.make.graphics({}, false);
  kiosk.fillStyle(0x475569, 1);
  kiosk.fillRect(6, 4, 20, 26);
  kiosk.fillStyle(0x38bdf8, 1);
  kiosk.fillRect(9, 8, 14, 12);
  kiosk.fillStyle(0xfbbf24, 1);
  kiosk.fillRect(12, 22, 8, 4);
  kiosk.generateTexture("prop-kiosk", 32, 32);
  kiosk.destroy();

  const marker = scene.make.graphics({}, false);
  marker.fillStyle(0xf59e0b, 1);
  marker.fillTriangle(8, 0, 16, 14, 0, 14);
  marker.lineStyle(2, 0xffffff, 1);
  marker.strokeTriangle(8, 0, 16, 14, 0, 14);
  marker.generateTexture("quest-marker", 16, 16);
  marker.destroy();
}

export function npcHumanTextureKey(npcId: string): string {
  if (npcId.includes("guide")) return "human-guide";
  if (npcId.includes("hr")) return "human-hr";
  if (npcId.includes("lead")) return "human-lead";
  if (npcId.includes("security")) return "human-security";
  return "human-npc";
}

export function registerAllOfficeHumans(scene: Phaser.Scene): void {
  registerHumanSheet(scene, "human-player", 0x0ea5e9, 0x1e3a5f, 0xffdbac, 0x1e293b);
  registerHumanSheet(scene, "human-guide", 0x14b8a6, 0x134e4a, 0xffdbac, 0x422006);
  registerHumanSheet(scene, "human-hr", 0xbe185d, 0x500724, 0xf5d0c5, 0x292524);
  registerHumanSheet(scene, "human-lead", 0x1d4ed8, 0x1e3a8a, 0xffdbac, 0x57534e);
  registerHumanSheet(scene, "human-security", 0x64748b, 0x334155, 0xffdbac, 0x0f172a);
}
