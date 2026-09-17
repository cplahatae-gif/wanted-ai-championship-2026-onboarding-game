import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { parseGamePack, safeParseGamePack } from "./gamepack.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(here, "../fixtures/neulbom-labs.json");

test("Neulbom fixture parses", () => {
  const raw = JSON.parse(readFileSync(fixturePath, "utf8"));
  const pack = parseGamePack(raw);
  assert.equal(pack.meta.companyName, "Neulbom Labs");
  assert.equal(pack.quests.length, 10);
});

test("broken pack is rejected", () => {
  const raw = JSON.parse(readFileSync(fixturePath, "utf8"));
  const broken = { ...raw, meta: { ...raw.meta, locale: "en" } };
  const result = safeParseGamePack(broken);
  assert.equal(result.success, false);
});
