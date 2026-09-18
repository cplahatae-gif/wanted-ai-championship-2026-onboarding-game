import type { GamePack } from "gamepack-schema";
import type Phaser from "phaser";

function hex(n: string): number {
  return parseInt(n.replace("#", ""), 16);
}

export function registerVfxTextures(scene: Phaser.Scene, pack: GamePack): void {
  const accent = hex(pack.visual.palette[2] ?? "#e94560");

  const shadow = scene.make.graphics({}, false);
  shadow.fillStyle(0x000000, 0.35);
  shadow.fillEllipse(16, 10, 28, 12);
  shadow.generateTexture("char-shadow", 32, 16);
  shadow.destroy();

  const spark = scene.make.graphics({}, false);
  spark.fillStyle(0xffffff, 1);
  spark.fillCircle(4, 4, 4);
  spark.fillStyle(accent, 1);
  spark.fillCircle(4, 4, 2);
  spark.generateTexture("particle-spark", 8, 8);
  spark.destroy();
}

export function npcSpriteKey(npcId: string): string {
  if (npcId.includes("security")) return "npc-slime";
  if (npcId.includes("guide")) return "npc-ghost";
  return "hero-dude";
}

/** Map velocity to dude rotation frame (0–8). */
export function heroFrameFromVelocity(vx: number, vy: number, tick: number): number {
  if (vx === 0 && vy === 0) return 4;
  const angle = Math.atan2(vy, vx);
  const oct = Math.round(angle / (Math.PI / 4));
  const base = ((oct + 8) % 8) + 1;
  return tick % 2 === 0 ? base : Math.min(8, base + 1);
}
