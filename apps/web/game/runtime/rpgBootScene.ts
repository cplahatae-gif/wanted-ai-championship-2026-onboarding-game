import type { GamePack } from "gamepack-schema";
import * as Phaser from "phaser";
import { registerVfxTextures } from "./proceduralRpgSprites";
import {
  installKenneyCommercial,
  preloadKenneyCommercial,
} from "./commercialKenneyBoot";

export function createBootScene(nextSceneKey: string) {
  return class RpgBootScene extends Phaser.Scene {
    constructor() {
      super("rpg-boot");
    }

    preload() {
      preloadKenneyCommercial(this);
    }

    create() {
      const pack = this.registry.get("gamePack") as GamePack;
      installKenneyCommercial(this);
      registerVfxTextures(this, pack);
      this.scene.start(nextSceneKey);
    }
  };
}
