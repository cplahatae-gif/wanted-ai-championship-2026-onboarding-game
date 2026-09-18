import type { GamePack } from "gamepack-schema";
import * as Phaser from "phaser";
import { registerVfxTextures } from "./proceduralRpgSprites";

export function createBootScene(nextSceneKey: string) {
  return class RpgBootScene extends Phaser.Scene {
    constructor() {
      super("rpg-boot");
    }

    preload() {
      this.load.spritesheet("cata-tiles", "/game/rpg/office-tiles.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
      this.load.spritesheet("hero-dude", "/game/rpg/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.spritesheet("npc-ghost", "/game/rpg/ghost.png", {
        frameWidth: 32,
        frameHeight: 32,
      });
      this.load.image("quest-gem", "/game/rpg/gem.png");
      this.load.spritesheet("npc-slime", "/game/rpg/sprites-slime.png", {
        frameWidth: 32,
        frameHeight: 32,
      });
    }

    create() {
      const pack = this.registry.get("gamePack") as GamePack;
      registerVfxTextures(this, pack);
      this.scene.start(nextSceneKey);
    }
  };
}
