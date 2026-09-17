import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import { buildCompletionReport } from "./completionReport";
import { completeQuest, createInitialProgress, setFlag } from "./questProgress";

describe("completion report", () => {
  it("counts quiz flags", () => {
    const pack = parseGamePack(neulbomFixture);
    let progress = createInitialProgress();
    progress = setFlag(progress, "security_quiz_pass");
    const report = buildCompletionReport(pack, progress);
    assert.equal(report.quizScore, 1);
    assert.equal(report.missionsTotal, 10);
  });

  it("checklist reflects completed quests", () => {
    const pack = parseGamePack(neulbomFixture);
    const q = pack.quests[0]!;
    let progress = createInitialProgress();
    progress = completeQuest(progress, q);
    const report = buildCompletionReport(pack, progress);
    assert.equal(report.missionsComplete, 1);
    assert.equal(report.checklist[0]?.done, true);
  });
});
