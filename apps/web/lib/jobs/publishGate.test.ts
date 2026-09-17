import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resetStoreForTests } from "./store";
import { confirmAndPublish, startOrResumeGenerate } from "./runGeneratePipeline";

describe("publish gate", () => {
  it("blocks publish without HR confirm", () => {
    resetStoreForTests();
    const job = startOrResumeGenerate({
      idempotencyKey: "pub-test-1",
      interview: {
        companyName: "Fictional Inc",
        teamName: "HR",
        vibe: "formal",
        focus: "security",
      },
      documentText: "## A\n\n1. One\n2. Two\n3. Three\n",
      documentName: "a.md",
    });
    assert.throws(() => confirmAndPublish(job.id, false));
  });

  it("publishes with HR confirm", () => {
    resetStoreForTests();
    const job = startOrResumeGenerate({
      idempotencyKey: "pub-test-2",
      interview: {
        companyName: "Fictional Inc",
        teamName: "HR",
        vibe: "formal",
        focus: "security",
      },
      documentText: "## A\n\n1. One\n2. Two\n3. Three\n",
      documentName: "a.md",
    });
    const published = confirmAndPublish(job.id, true);
    assert.ok(published?.publishedSlug);
  });
});
