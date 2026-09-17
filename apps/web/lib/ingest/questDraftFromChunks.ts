import type { InterviewAnswers } from "@/lib/create/interview";
import type { QuestDraftFromDoc, SourceChunk } from "./types";

const TEMPLATE_IDS = [
  "q1-welcome",
  "q2-desk",
  "q3-hr",
  "q4-tools",
  "q5-kitchen",
  "q6-security",
  "q7-lab",
  "q8-sync",
  "q9-quiz",
  "q10-exit",
] as const;

function listItemsFromChunk(chunk: SourceChunk): string[] {
  return chunk.text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^(\d+\.|[-*])\s+/.test(line))
    .map((line) => line.replace(/^(\d+\.|[-*])\s+/, "").trim());
}

export function buildQuestDraftsFromChunks(
  chunks: SourceChunk[],
  answers: InterviewAnswers,
  missionCount = 3,
): QuestDraftFromDoc[] {
  const items: { title: string; sourceRefs: string[] }[] = [];
  for (const chunk of chunks) {
    for (const item of listItemsFromChunk(chunk)) {
      items.push({ title: item, sourceRefs: [chunk.id] });
    }
  }
  if (items.length === 0) {
    items.push(
      {
        title: `${answers.companyName} 온보딩 시작`,
        sourceRefs: [chunks[0]?.id ?? "chunk-1"],
      },
      {
        title: "팀 문화 둘러보기",
        sourceRefs: [chunks[0]?.id ?? "chunk-1"],
      },
      {
        title: "정책 확인",
        sourceRefs: [chunks[1]?.id ?? chunks[0]?.id ?? "chunk-1"],
      },
    );
  }

  const count = Math.min(missionCount, TEMPLATE_IDS.length, items.length);
  return Array.from({ length: count }, (_, i) => {
    const item = items[i]!;
    const id = TEMPLATE_IDS[i]!;
    return {
      id,
      title: item.title,
      description: `${answers.teamName} · ${item.title} (문서 근거: ${item.sourceRefs.join(", ")})`,
      sourceRefs: item.sourceRefs,
    };
  });
}
