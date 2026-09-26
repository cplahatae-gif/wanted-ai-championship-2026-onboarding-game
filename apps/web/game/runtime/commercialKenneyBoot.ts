import type Phaser from "phaser";
import { addSheetFrames } from "./kenneyCharacterFrames";
import { createClassicTextures, registerClassicVfx } from "./classicRetroArt";

const TOWN_KEY = "kenney-tiny-town";
const CHAR_SRC = "kenney-chars-source";

export function preloadKenneyCommercial(scene: Phaser.Scene): void {
  scene.load.image(TOWN_KEY, "/game/kenney/tiny-town-tiles.png");
  scene.load.image(CHAR_SRC, "/game/kenney/roguelike-characters.png");
}

/** Returns true when Kenney assets are active. */
export function installKenneyCommercial(scene: Phaser.Scene): boolean {
  if (!scene.textures.exists(TOWN_KEY) || !scene.textures.exists(CHAR_SRC)) {
    createClassicTextures(scene);
    scene.registry.set("visualTier", "classic");
    return false;
  }

  const town = scene.textures.get(TOWN_KEY).getSourceImage() as HTMLImageElement;
  if (!town?.width || town.width < 64) {
    createClassicTextures(scene);
    scene.registry.set("visualTier", "classic");
    return false;
  }

  if (!scene.textures.exists("classic-tiles")) {
    scene.textures.addImage("classic-tiles", town);
  }

  buildKenneyCharacterSheets(scene);
  registerClassicVfx(scene);
  scene.registry.set("visualTier", "kenney");
  return true;
}

/** Roguelike sheet: 16×16 cells, 1px spacing → 17px stride. Rows 0–3 = walk frames. */
const CHAR_COL_BY_KEY: Record<string, number> = {
  "char-player": 0,
  "char-guide": 1,
  "char-hr": 6,
  "char-lead": 7,
  "char-security": 3,
  "char-npc": 4,
};

function buildKenneyCharacterSheets(scene: Phaser.Scene): void {
  const img = scene.textures.get(CHAR_SRC).getSourceImage() as HTMLImageElement;
  const stride = 17;
  const fw = 16;
  const fh = 16;

  for (const [key, col] of Object.entries(CHAR_COL_BY_KEY)) {
    if (scene.textures.exists(key)) {
      scene.textures.remove(key);
    }
    const canvas = scene.textures.createCanvas(key, fw * 4, fh * 4);
    if (!canvas) continue;
    const ctx = canvas.getContext();
    for (let dir = 0; dir < 4; dir++) {
      for (let f = 0; f < 4; f++) {
        const sx = col * stride;
        const sy = f * stride;
        ctx.drawImage(img, sx, sy, fw, fh, f * fw, dir * fh, fw, fh);
      }
    }
    canvas.refresh();
    addSheetFrames(scene.textures.get(key), fw, fh, 16);
  }
}
