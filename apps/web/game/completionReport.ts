import type { GamePack } from "gamepack-schema";
import type { QuestProgress } from "./questProgress";

export type CompletionReport = {
  companyName: string;
  missionsComplete: number;
  missionsTotal: number;
  quizScore: number;
  quizMax: number;
  flags: string[];
  checklist: { label: string; done: boolean }[];
};

export function buildCompletionReport(pack: GamePack, progress: QuestProgress): CompletionReport {
  const quizFlags = ["security_quiz_pass", "security_quiz_advanced"];
  const earned = quizFlags.filter((f) => progress.flags.has(f)).length;
  const checklist = pack.quests.map((q) => ({
    label: q.title,
    done: progress.completedQuestIds.includes(q.id),
  }));
  return {
    companyName: pack.meta.companyName,
    missionsComplete: progress.completedQuestIds.length,
    missionsTotal: pack.quests.length,
    quizScore: earned,
    quizMax: quizFlags.length,
    flags: [...progress.flags],
    checklist,
  };
}

export function formatReportText(report: CompletionReport): string {
  const lines = [
    `First Quest · ${report.companyName} Day 0 리포트`,
    `미션 ${report.missionsComplete}/${report.missionsTotal}`,
    `퀴즈 ${report.quizScore}/${report.quizMax}`,
    ...report.checklist.map((c) => `${c.done ? "✓" : "○"} ${c.label}`),
  ];
  return lines.join("\n");
}
