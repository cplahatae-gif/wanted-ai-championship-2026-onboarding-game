import type Phaser from "phaser";

/** 16×16 DawnLike-style office / dungeon palette */
export const T = {
  FLOOR: 0,
  FLOOR2: 1,
  WALL: 2,
  DESK: 3,
  PARTITION: 4,
  BREAK: 5,
  LAB: 6,
  RECEPTION: 7,
} as const;

export const TILE_COLLISION = [T.WALL, T.DESK, T.PARTITION];

export type WalkDir = "down" | "up" | "left" | "right";

export function dirFromVelocity(vx: number, vy: number, last: WalkDir): WalkDir {
  if (vx === 0 && vy === 0) return last;
  if (Math.abs(vx) > Math.abs(vy)) return vx > 0 ? "right" : "left";
  return vy > 0 ? "down" : "up";
}

export function humanFrameIndex(dir: WalkDir, walkFrame: number): number {
  const row = { down: 0, up: 1, left: 2, right: 3 }[dir];
  return row * 4 + (walkFrame % 4);
}

export function npcTextureKey(npcId: string): string {
  if (npcId.includes("guide")) return "char-guide";
  if (npcId.includes("hr")) return "char-hr";
  if (npcId.includes("lead")) return "char-lead";
  if (npcId.includes("security")) return "char-security";
  return "char-npc";
}

const PAL = {
  outline: 0x1a1c2c,
  floorA: 0xc2c3c7,
  floorB: 0x9badb7,
  wall: 0x5d606b,
  wallHi: 0x8b8b8b,
  wood: 0x8b6914,
  woodHi: 0xb8922e,
  monitor: 0x3a4466,
  screen: 0x29adff,
  plant: 0x38b764,
  pot: 0x72461b,
  teal: 0x26a69a,
  pink: 0xc2185b,
  navy: 0x1e3a8a,
  gray: 0x64748b,
  skin: 0xffccaa,
  skinSh: 0xe0a080,
  hair: 0x3d2314,
  hair2: 0x2a180e,
  white: 0xfff1e8,
  gold: 0xffc107,
};

function fill16(g: Phaser.GameObjects.Graphics, ox: number, oy: number, grid: string[], colors: Record<string, number>) {
  for (let y = 0; y < 16; y++) {
    const row = grid[y] ?? "";
    for (let x = 0; x < 16; x++) {
      const ch = row[x] ?? ".";
      if (ch === ".") continue;
      const c = colors[ch];
      if (c === undefined) continue;
      g.fillStyle(c, 1);
      g.fillRect(ox + x, oy + y, 1, 1);
    }
  }
}

const TILE_GRIDS: Record<number, { grid: string[]; colors: Record<string, number> }> = {
  [T.FLOOR]: {
    grid: [
      "................",
      "..aa..aa..aa....",
      ".aa..aa..aa..aa.",
      "..aa..aa..aa....",
      "................",
      "..bb..bb..bb....",
      ".bb..bb..bb..bb.",
      "..bb..bb..bb....",
      "................",
      "..aa..aa..aa....",
      ".aa..aa..aa..aa.",
      "..aa..aa..aa....",
      "................",
      "..bb..bb..bb....",
      ".bb..bb..bb..bb.",
      "..bb..bb..bb....",
    ],
    colors: { ".": PAL.floorA, a: PAL.floorA, b: PAL.floorB },
  },
  [T.FLOOR2]: {
    grid: [
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
      "abababababababab",
      "babababababababa",
    ],
    colors: { a: PAL.floorA, b: PAL.floorB },
  },
  [T.WALL]: {
    grid: [
      "OOOOOOOOOOOOOOOO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OwwwwwwwwwwwwwWO",
      "OwWhhhhhhhhhhwWO",
      "OOOOOOOOOOOOOOOO",
    ],
    colors: { O: PAL.outline, w: PAL.wall, h: PAL.wallHi, W: PAL.wall },
  },
  [T.DESK]: {
    grid: [
      "................",
      "................",
      "..OOOOOOOOOO....",
      "..OwwwwwwwwO....",
      "..OwWssssWwO....",
      "..OwWsSSsWwO....",
      "..OwWssssWwO....",
      "..OwwwwwwwwO....",
      "..OOOOOOOOOO....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
    colors: { O: PAL.outline, w: PAL.wood, W: PAL.woodHi, s: PAL.monitor, S: PAL.screen, ".": PAL.floorA },
  },
  [T.PARTITION]: {
    grid: [
      "..OOOOOOOOOO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OwwwwwwwwO....",
      "..OOOOOOOOOO....",
    ],
    colors: { O: PAL.outline, w: PAL.wall, ".": PAL.floorA },
  },
  [T.BREAK]: {
    grid: [
      "................",
      "..pppppppppp....",
      ".pPPPPPPPPPp....",
      ".pPPggggPPPp....",
      ".pPPgGGgPPPp....",
      ".pPPggggPPPp....",
      ".pPPPPPPPPPp....",
      "..pppppppppp....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
    colors: { p: PAL.pot, P: PAL.plant, g: PAL.plant, G: 0x4ade80, ".": PAL.floorA },
  },
  [T.LAB]: {
    grid: [
      "................",
      "..bbbbbbbbbb....",
      ".bBBBBBBBBBb....",
      ".bBBssssBBBb....",
      ".bBBsSSsBBBb....",
      ".bBBssssBBBb....",
      ".bBBBBBBBBBb....",
      "..bbbbbbbbbb....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
    colors: { b: PAL.outline, B: 0xdce8f0, s: PAL.monitor, S: PAL.screen, ".": PAL.floorA },
  },
  [T.RECEPTION]: {
    grid: [
      "tttttttttttttttt",
      "t..............t",
      "t..aaaaaaaaaa..t",
      "t..abbbbbbbbba.t",
      "t..abbbbbbbbba.t",
      "t..aaaaaaaaaa..t",
      "t..............t",
      "t..............t",
      "t..............t",
      "t..............t",
      "t..............t",
      "t..............t",
      "t..............t",
      "t..............t",
      "t..............t",
      "tttttttttttttttt",
    ],
    colors: { t: PAL.teal, ".": PAL.floorA, a: PAL.floorB, b: PAL.floorA },
  },
};

function drawCharFrame(
  g: Phaser.GameObjects.Graphics,
  ox: number,
  oy: number,
  dir: WalkDir,
  frame: number,
  shirt: number,
  shirtHi: number,
  pants: number,
) {
  const leg = frame % 2;
  const colors: Record<string, number> = {
    ".": 0x00000000,
    O: PAL.outline,
    h: PAL.hair,
    H: PAL.hair2,
    s: PAL.skin,
    S: PAL.skinSh,
    c: shirt,
    C: shirtHi,
    p: pants,
    P: pants,
    w: PAL.white,
  };

  const down: string[] = [
    "......hhhh......",
    ".....hHHHHh.....",
    "....hHsSSsHh....",
    "....hHsSSsHh....",
    ".....hSSSSh.....",
    "......cccc......",
    ".....cccccc.....",
    "....cccccCcc....",
    ".....cc..cc.....",
    leg ? "..pp....pp.." : "..p......p..",
    leg ? ".pp......pp." : "..pp....pp..",
    leg ? ".pp......pp." : "..pp....pp..",
    "................",
    "................",
    "................",
    "................",
  ];

  const up: string[] = [
    "......hhhh......",
    ".....hHHHHh.....",
    "....hHHHHHHh....",
    "....hHHHHHHh....",
    ".....hHHHHh.....",
    "......cccc......",
    ".....cccccc.....",
    "....cccccccc....",
    ".....cc..cc.....",
    leg ? "..pp....pp.." : "..p......p..",
    leg ? ".pp......pp." : "..pp....pp..",
    leg ? ".pp......pp." : "..pp....pp..",
    "................",
    "................",
    "................",
    "................",
  ];

  const left: string[] = [
    ".....hhhh.......",
    "....hHHHHh......",
    "...hHsSSsHh.....",
    "...hHsSSsHh.....",
    "....hSSSSh......",
    ".....cccc.......",
    "....cccccc......",
    "...ccccCccc.....",
    "....cc..cc......",
    leg ? "..pp...p......" : "..p....p......",
    leg ? ".pp....pp....." : "..pp..pp......",
    leg ? ".pp....pp....." : "..pp..pp......",
    "................",
    "................",
    "................",
    "................",
  ];

  const right = left.map((row) => row.split("").reverse().join(""));

  const grid = dir === "down" ? down : dir === "up" ? up : dir === "left" ? left : right;
  fill16(g, ox, oy, grid, colors);
}

function addSheetFrames(tex: Phaser.Textures.Texture, fw: number, fh: number, count: number) {
  for (let i = 0; i < count; i++) {
    const name = `${i}`;
    if (tex.has(name)) continue;
    const col = i % 4;
    const row = Math.floor(i / 4);
    tex.add(name, 0, col * fw, row * fh, fw, fh);
  }
}

export function registerClassicTileset(scene: Phaser.Scene): void {
  const g = scene.make.graphics({}, false);
  for (let i = 0; i < 8; i++) {
    const spec = TILE_GRIDS[i];
    if (spec) fill16(g, i * 16, 0, spec.grid, spec.colors);
  }
  g.generateTexture("classic-tiles", 128, 16);
  g.destroy();

  const kiosk = scene.make.graphics({}, false);
  fill16(
    kiosk,
    0,
    0,
    [
      "................",
      "....OOOOOOOO....",
      "...OwwwwwwwwO...",
      "...OwsssssswO...",
      "...OwssSSsswO...",
      "...OwsssssswO...",
      "...OwwwwwwwwO...",
      "...OwwggggwwO...",
      "...OwwggggwwO...",
      "...OOOOOOOOOO...",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
    { O: PAL.outline, w: PAL.wall, s: PAL.monitor, S: PAL.screen, g: PAL.gold, ".": 0x00000000 },
  );
  kiosk.generateTexture("prop-kiosk", 16, 16);
  kiosk.destroy();

  const marker = scene.make.graphics({}, false);
  marker.fillStyle(PAL.gold, 1);
  marker.fillTriangle(8, 0, 15, 14, 1, 14);
  marker.lineStyle(1, PAL.outline, 1);
  marker.strokeTriangle(8, 0, 15, 14, 1, 14);
  marker.generateTexture("quest-marker", 16, 16);
  marker.destroy();

  const shadow = scene.make.graphics({}, false);
  shadow.fillStyle(0x000000, 0.35);
  shadow.fillEllipse(8, 4, 14, 6);
  shadow.generateTexture("char-shadow", 16, 8);
  shadow.destroy();
}

function registerChar(scene: Phaser.Scene, key: string, shirt: number, shirtHi: number, pants: number) {
  const fw = 16;
  const fh = 16;
  const g = scene.make.graphics({}, false);
  const dirs: WalkDir[] = ["down", "up", "left", "right"];
  dirs.forEach((dir, row) => {
    for (let f = 0; f < 4; f++) {
      drawCharFrame(g, f * fw, row * fh, dir, f, shirt, shirtHi, pants);
    }
  });
  g.generateTexture(key, fw * 4, fh * 4);
  g.destroy();
  addSheetFrames(scene.textures.get(key), fw, fh, 16);
}

export function registerClassicCharacters(scene: Phaser.Scene): void {
  registerChar(scene, "char-player", 0x0ea5e9, 0x38bdf8, 0x1e3a8a);
  registerChar(scene, "char-guide", PAL.teal, 0x4db6ac, 0x00695c);
  registerChar(scene, "char-hr", PAL.pink, 0xf06292, 0x880e4f);
  registerChar(scene, "char-lead", PAL.navy, 0x3b82f6, 0x0f172a);
  registerChar(scene, "char-security", PAL.gray, 0x94a3b8, 0x334155);
  registerChar(scene, "char-npc", 0x78716c, 0xa8a29e, 0x44403c);
}

export function registerClassicVfx(scene: Phaser.Scene): void {
  const spark = scene.make.graphics({}, false);
  spark.fillStyle(PAL.white, 1);
  spark.fillRect(0, 0, 4, 4);
  spark.fillStyle(PAL.gold, 1);
  spark.fillRect(1, 1, 2, 2);
  spark.generateTexture("particle-spark", 4, 4);
  spark.destroy();
}

/** Reserved for optional PNG sheets in public/game/classic/ (see README). */
export function preloadClassicAssets(_scene: Phaser.Scene): void {
  /* Procedural art is generated in create — no network preload required. */
}

export function createClassicTextures(scene: Phaser.Scene): void {
  registerClassicTileset(scene);
  registerClassicCharacters(scene);
  registerClassicVfx(scene);
}
