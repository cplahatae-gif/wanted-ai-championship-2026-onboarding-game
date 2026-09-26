import type Phaser from "phaser";

export function addSheetFrames(tex: Phaser.Textures.Texture, fw: number, fh: number, count: number) {
  for (let i = 0; i < count; i++) {
    const name = `${i}`;
    if (tex.has(name)) continue;
    const col = i % 4;
    const row = Math.floor(i / 4);
    tex.add(name, 0, col * fw, row * fh, fw, fh);
  }
}
