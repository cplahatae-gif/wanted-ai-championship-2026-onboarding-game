import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";

describe("game-3d POI map", () => {
  it("fixture POIs map to quest objectives", () => {
    const pack = parseGamePack(neulbomFixture);
    const poiIds = new Set(pack.pois.map((p) => p.id));
    const reachQuests = pack.quests.filter((q) => q.objective.type === "reach");
    for (const q of reachQuests) {
      if (q.objective.type === "reach") {
        assert.ok(poiIds.has(q.objective.poiId), q.id);
      }
    }
  });
});
