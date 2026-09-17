export type InterviewAnswers = {
  companyName: string;
  teamName: string;
  vibe: "playful" | "formal" | "tech";
  focus: "culture" | "tools" | "security";
};

export const INTERVIEW_STEPS: { id: keyof InterviewAnswers; prompt: string }[] = [
  { id: "companyName", prompt: "가상 회사 이름 (실제 고객명 금지)" },
  { id: "teamName", prompt: "신입이 합류할 팀 이름" },
  { id: "vibe", prompt: "온보딩 톤 (playful / formal / tech)" },
  { id: "focus", prompt: "강조 주제 (culture / tools / security)" },
];

export function mergeInterviewIntoDraft(
  base: InterviewAnswers,
  partial: Partial<InterviewAnswers>,
): InterviewAnswers {
  return { ...base, ...partial };
}
