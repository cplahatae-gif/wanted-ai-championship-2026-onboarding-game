import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertDocumentSize, chunkMarkdown } from "./chunkDocument";
import { buildQuestDraftsFromChunks } from "./questDraftFromChunks";

describe("ingest", () => {
  it("chunks markdown by heading", () => {
    const chunks = chunkMarkdown("# Title\n\n## One\n\nline\n\n## Two\n\n2. item");
    assert.ok(chunks.length >= 2);
    assert.equal(chunks[0]?.id, "chunk-1");
  });

  it("rejects empty document", () => {
    assert.throws(() => assertDocumentSize(0));
  });

  it("maps list items to quest drafts with sourceRefs", () => {
    const chunks = chunkMarkdown("## Goals\n\n1. Alpha\n2. Beta\n3. Gamma\n");
    const drafts = buildQuestDraftsFromChunks(chunks, {
      companyName: "Test Co",
      teamName: "Team",
      vibe: "tech",
      focus: "tools",
    });
    assert.equal(drafts.length, 3);
    assert.ok(drafts[0]?.sourceRefs.length);
  });
});
