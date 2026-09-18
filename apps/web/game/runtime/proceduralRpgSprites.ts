import type { GamePack } from "gamepack-schema";
import type Phaser from "phaser";

function hex(n: string): number {
  return parseInt(n.replace("#", ""), 16);
}

export function registerVfxTextures(scene: Phaser.Scene, pack: GamePack): void {
  const accent = hex(pack.visual.palette[2] ?? "#e94560");

  const shadow = scene.make.graphics({}, false);
  shadow.fillStyle(0x000000, 0.28);
  shadow.fillEllipse(16, 10, 26, 10);
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
