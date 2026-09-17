import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resetStoreForTests } from "./store";
import { startOrResumeGenerate } from "./runGeneratePipeline";

const sampleBody = {
  idempotencyKey: "test-idem-1",
  interview: {
    companyName: "Aurora Widgets",
    teamName: "People Experience",
    vibe: "playful" as const,
    focus: "culture" as const,
  },
  documentText: "# Fictional\n\n## Day 0\n\n1. Meet buddy\n2. Desk setup\n3. Policy ack\n",
  documentName: "fictional-onboarding.md",
  visualPresetId: "tech-startup",
};

describe("generate job idempotency", () => {
  it("same idempotency key returns same job id and pack", () => {
    resetStoreForTests();
    const a = startOrResumeGenerate(sampleBody);
    const b = startOrResumeGenerate(sampleBody);
    assert.equal(a.id, b.id);
    assert.equal(a.status, "Ready");
    assert.equal(b.status, "Ready");
    assert.ok(a.draftPack);
    assert.equal(a.draftPack?.quests.length, 3);
  });
});
