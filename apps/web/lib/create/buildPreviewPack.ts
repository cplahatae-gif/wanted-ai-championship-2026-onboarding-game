import { parseGamePack, type GamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import type { InterviewAnswers } from "./interview";

const PREVIEW_QUEST_IDS = ["q1-welcome", "q2-desk", "q3-hr"] as const;

export function buildPreviewGamePack(answers: InterviewAnswers): GamePack {
  const base = parseGamePack(neulbomFixture);
  const quests = base.quests.filter((q) =>
    (PREVIEW_QUEST_IDS as readonly string[]).includes(q.id),
  );
  const npcIds = new Set<string>();
  const dialogueIds = new Set<string>();
  const poiIds = new Set<string>();
  for (const quest of quests) {
    if (quest.objective.type === "talk") npcIds.add(quest.objective.npcId);
    if (quest.objective.type === "reach") poiIds.add(quest.objective.poiId);
    if (quest.objective.type === "interact") poiIds.add(quest.objective.poiId);
    if (quest.objective.type === "flag") {
      npcIds.add("npc-hr");
    }
  }
  for (const npc of base.npcs) {
    if (npcIds.has(npc.id)) dialogueIds.add(npc.dialogueId);
  }

  const titleSuffix =
    answers.vibe === "playful"
      ? "플레이풀 온보딩"
      : answers.vibe === "formal"
        ? "정석 온보딩"
        : "테크 온보딩";

  return parseGamePack({
    ...base,
    meta: {
      ...base.meta,
      id: `preview-${answers.companyName.toLowerCase().replace(/\s+/g, "-")}`,
      title: `${answers.companyName} ${titleSuffix}`,
      companyName: answers.companyName,
      version: "0.1.0-preview",
    },
    quests,
    npcs: base.npcs.filter((n) => npcIds.has(n.id)),
    dialogues: base.dialogues.filter((d) => dialogueIds.has(d.id)),
    pois: base.pois.filter((p) => poiIds.has(p.id)),
  });
}

export function previewMissionCount(pack: GamePack): number {
  return pack.quests.length;
}
