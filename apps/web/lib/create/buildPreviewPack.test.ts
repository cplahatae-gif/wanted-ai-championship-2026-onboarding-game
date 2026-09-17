import assert from "node:assert/strict";
import test from "node:test";
import { buildPreviewGamePack } from "./buildPreviewPack.js";
import { mergeInterviewIntoDraft } from "./interview.js";

test("interview merge feeds preview pack meta", () => {
  const answers = mergeInterviewIntoDraft(
    {
      companyName: "Neulbom Labs",
      teamName: "Platform",
      vibe: "tech",
      focus: "tools",
    },
    { companyName: "Fictional Co" },
  );
  const pack = buildPreviewGamePack(answers);
  assert.equal(pack.meta.companyName, "Fictional Co");
  assert.equal(pack.quests.length, 3);
});
