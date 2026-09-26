#!/usr/bin/env node
/**
 * Fetches Kenney CC0 packs used for commercial-tier demo art.
 * Run from repo root: node apps/web/scripts/fetch-rpg-assets.mjs
 */
import { mkdir, writeFile, cp } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "../public/game/kenney");
const tmp = join(here, "../.cache/kenney-dl");

const ZIPS = [
  {
    url: "https://kenney.nl/media/pages/assets/tiny-town/a415fbeb49-1735736916/kenney_tiny-town.zip",
    tileSrc: "Tilemap/tilemap_packed.png",
    tileDest: "tiny-town-tiles.png",
    license: "License.txt",
    licenseDest: "LICENSE-tiny-town.txt",
  },
  {
    url: "https://kenney.nl/media/pages/assets/roguelike-characters/53ffff4133-1729196490/kenney_roguelike-characters.zip",
    tileSrc: "Spritesheet/roguelikeChar_transparent.png",
    tileDest: "roguelike-characters.png",
    license: "License.txt",
    licenseDest: "LICENSE-characters.txt",
  },
];

await mkdir(outDir, { recursive: true });
await mkdir(tmp, { recursive: true });

for (const pack of ZIPS) {
  const zipPath = join(tmp, pack.url.split("/").pop());
  const res = await fetch(pack.url);
  if (!res.ok) {
    console.warn(`skip ${pack.tileDest}: HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(zipPath, buf);
  const extractDir = join(tmp, pack.tileDest.replace(".png", ""));
  execSync(`unzip -q -o "${zipPath}" -d "${extractDir}"`, { stdio: "inherit" });
  const srcFile = join(extractDir, pack.tileSrc);
  if (!existsSync(srcFile)) {
    console.warn(`missing ${srcFile} in zip`);
    continue;
  }
  await cp(srcFile, join(outDir, pack.tileDest));
  const lic = join(extractDir, pack.license);
  if (existsSync(lic)) {
    await cp(lic, join(outDir, pack.licenseDest));
  }
  console.log(`wrote ${pack.tileDest}`);
}

console.log("Done → apps/web/public/game/kenney/");
