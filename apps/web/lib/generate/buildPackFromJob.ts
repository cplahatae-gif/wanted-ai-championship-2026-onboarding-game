import { parseGamePack, type GamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import type { InterviewAnswers } from "@/lib/create/interview";
import { buildQuestDraftsFromChunks } from "@/lib/ingest/questDraftFromChunks";
import type { SourceChunk } from "@/lib/ingest/types";
import { applyVisualToPack } from "@/lib/visual/presets";

const PREVIEW_MISSION_COUNT = 3;

export function buildGamePackFromIngest(input: {
  interview: InterviewAnswers;
  chunks: SourceChunk[];
  visualPresetId: string;
  photoPalette?: [string, string, string];
  missionCount?: number;
}): GamePack {
  const base = parseGamePack(neulbomFixture);
  const missionCount = input.missionCount ?? PREVIEW_MISSION_COUNT;
  const drafts = buildQuestDraftsFromChunks(input.chunks, input.interview, missionCount);
  const draftIds = new Set(drafts.map((d) => d.id));

  const quests = base.quests
    .filter((q) => draftIds.has(q.id))
    .map((q) => {
      const draft = drafts.find((d) => d.id === q.id);
      if (!draft) return q;
      return {
        ...q,
        title: draft.title,
        description: draft.description,
        sourceRefs: draft.sourceRefs,
      };
    });

  const npcIds = new Set<string>();
  const poiIds = new Set<string>();
  const dialogueIds = new Set<string>();
  for (const quest of quests) {
    if (quest.objective.type === "talk") npcIds.add(quest.objective.npcId);
    if (quest.objective.type === "reach") poiIds.add(quest.objective.poiId);
    if (quest.objective.type === "interact") poiIds.add(quest.objective.poiId);
    if (quest.objective.type === "flag") {
      npcIds.add("npc-hr");
      npcIds.add("npc-security");
    }
  }
  for (const npc of base.npcs) {
    if (npcIds.has(npc.id)) dialogueIds.add(npc.dialogueId);
  }

  const titleSuffix =
    input.interview.vibe === "playful"
      ? "플레이풀 온보딩"
      : input.interview.vibe === "formal"
        ? "정석 온보딩"
        : "테크 온보딩";

  let pack = parseGamePack({
    ...base,
    meta: {
      ...base.meta,
      id: `gen-${input.interview.companyName.toLowerCase().replace(/\s+/g, "-")}`,
      title: `${input.interview.companyName} ${titleSuffix}`,
      companyName: input.interview.companyName,
      version: "0.2.0-draft",
    },
    quests,
    npcs: base.npcs.filter((n) => npcIds.has(n.id)),
    dialogues: base.dialogues.filter((d) => dialogueIds.has(d.id)),
    pois: base.pois.filter((p) => poiIds.has(p.id)),
  });

  pack = applyVisualToPack(pack, input.visualPresetId, input.photoPalette);
  return pack;
}

export function slugFromCompany(companyName: string): string {
  const slug = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug.slice(0, 48) || "fictional-pack";
}
