import type { InterviewAnswers } from "./interview";
import { buildPreviewGamePack } from "./buildPreviewPack";

export type QuestOutlineItem = {
  id: string;
  title: string;
  description: string;
};

export function buildQuestOutline(answers: InterviewAnswers): QuestOutlineItem[] {
  const pack = buildPreviewGamePack(answers);
  return pack.quests.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
  }));
}

export function buildOutlineSummary(answers: InterviewAnswers): string {
  const focusLabel =
    answers.focus === "culture"
      ? "팀 문화"
      : answers.focus === "tools"
        ? "도구·워크플로"
        : "보안·정책";
  return `${answers.companyName} · ${answers.teamName} · ${focusLabel} 중심 3미션 초안 (샘플 문서 기반)`;
}
