#!/usr/bin/env node
/**
 * Downloads CC0-friendly reference tiles into public/game/classic/
 * Office map uses procedural classicRetroArt; vendored PNGs are optional overrides.
 * Run from repo root: node apps/web/scripts/fetch-rpg-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "../public/game/classic");

const SOURCES = [
  {
    name: "reference-dungeon-16.png",
    url: "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/tilemaps/tiles/catastrophi_tiles_16.png",
  },
];

await mkdir(outDir, { recursive: true });

for (const { name, url } of SOURCES) {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`skip ${name}: HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, name), buf);
  console.log(`wrote ${name} (${buf.length} bytes)`);
}

console.log("Done. Drop LPC 16×16 walk sheets as lpc-walk.png when you have them.");
