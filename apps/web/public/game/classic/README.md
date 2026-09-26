# Classic RPG art (First Quest)

The live demo builds **16×16 pixel office tiles and human walk cycles** at runtime (`classicRetroArt.ts`) — black outlines, 4-direction animation, 2× scale. This matches roguelike / DawnLike readability, not placeholder vector shapes.

Optional vendored PNGs:

| File | Purpose |
|------|---------|
| `reference-dungeon-16.png` | CC0 reference only (Phaser catastrophi sample); office map does **not** use green dungeon tiles |
| `lpc-walk.png` | Future: LPC-style 16×16 walk sheet (4 dirs × 4 frames) |

Fetch reference tile: `node apps/web/scripts/fetch-rpg-assets.mjs`

For championship-grade art, commit a consistent **office tileset + 5 character sheets** (Kenney Tiny Town, LPC, or custom Aseprite) and wire preload in `rpgBootScene.ts`.
