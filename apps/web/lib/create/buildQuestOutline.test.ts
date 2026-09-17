import assert from "node:assert/strict";
import test from "node:test";
import { buildOutlineSummary, buildQuestOutline } from "./buildQuestOutline.js";
import type { InterviewAnswers } from "./interview.js";

const answers: InterviewAnswers = {
  companyName: "Test Co",
  teamName: "HR",
  vibe: "tech",
  focus: "tools",
};

test("outline lists three preview quests", () => {
  const items = buildQuestOutline(answers);
  assert.equal(items.length, 3);
  assert.ok(items[0]?.title.length > 0);
});

test("summary mentions company", () => {
  assert.match(buildOutlineSummary(answers), /Test Co/);
});
