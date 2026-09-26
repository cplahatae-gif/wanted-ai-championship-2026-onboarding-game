import type { GamePack } from "gamepack-schema";
import * as Phaser from "phaser";
import {
  createClassicTextures,
  preloadClassicAssets,
} from "./classicRetroArt";
import { registerVfxTextures } from "./proceduralRpgSprites";

export function createBootScene(nextSceneKey: string) {
  return class RpgBootScene extends Phaser.Scene {
    constructor() {
      super("rpg-boot");
    }

    preload() {
      preloadClassicAssets(this);
    }

    create() {
      const pack = this.registry.get("gamePack") as GamePack;
      createClassicTextures(this);
      registerVfxTextures(this, pack);
      this.scene.start(nextSceneKey);
    }
  };
}
