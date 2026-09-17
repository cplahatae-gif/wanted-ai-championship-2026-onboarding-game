import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { parseGamePack } from "gamepack-schema";
import {
  completeQuest,
  createInitialProgress,
  getActiveQuest,
  isQuestUnlocked,
  setFlag,
} from "./questProgress.js";

const fixture = parseGamePack(
  JSON.parse(
    readFileSync(
      join(
        process.cwd(),
        "../../packages/gamepack-schema/fixtures/neulbom-labs.json",
      ),
      "utf8",
    ),
  ),
);

test("quest unlock follows prerequisites", () => {
  const progress = createInitialProgress();
  const q2 = fixture.quests.find((q) => q.id === "q2-desk");
  assert.ok(q2);
  assert.equal(isQuestUnlocked(q2, progress), false);
  let next = progress;
  for (const id of ["q1-welcome"]) {
    const quest = fixture.quests.find((q) => q.id === id);
    assert.ok(quest);
    next = completeQuest(next, quest);
  }
  assert.equal(isQuestUnlocked(q2!, next), true);
});

test("active quest advances after completion", () => {
  let progress = createInitialProgress();
  assert.equal(getActiveQuest(fixture, progress)?.id, "q1-welcome");
  const q1 = fixture.quests[0];
  progress = completeQuest(progress, q1);
  assert.equal(getActiveQuest(fixture, progress)?.id, "q2-desk");
});

test("flag objective quest unlocks after setFlag", () => {
  let progress = createInitialProgress();
  for (const id of ["q1-welcome", "q2-desk"]) {
    const quest = fixture.quests.find((q) => q.id === id)!;
    progress = completeQuest(progress, quest);
  }
  const q3 = fixture.quests.find((q) => q.id === "q3-hr")!;
  assert.equal(getActiveQuest(fixture, progress)?.id, "q3-hr");
  progress = setFlag(progress, "hr_policy_ack");
  progress = completeQuest(progress, q3);
  assert.equal(getActiveQuest(fixture, progress)?.id, "q4-tools");
});
