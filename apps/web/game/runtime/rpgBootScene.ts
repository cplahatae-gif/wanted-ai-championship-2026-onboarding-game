import type { GamePack } from "gamepack-schema";
import * as Phaser from "phaser";
import {
  registerAllOfficeHumans,
  registerOfficeEnvironment,
} from "./officeHumanSprites";
import { registerVfxTextures } from "./proceduralRpgSprites";

export function createBootScene(nextSceneKey: string) {
  return class RpgBootScene extends Phaser.Scene {
    constructor() {
      super("rpg-boot");
    }

    preload() {
      /* Office + humans are procedural textures (create phase). */
    }

    create() {
      const pack = this.registry.get("gamePack") as GamePack;
      registerOfficeEnvironment(this);
      registerAllOfficeHumans(this);
      registerVfxTextures(this, pack);
      this.scene.start(nextSceneKey);
    }
  };
}
