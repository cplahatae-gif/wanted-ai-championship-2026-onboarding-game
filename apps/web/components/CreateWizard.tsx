"use client";

import { useMemo, useState } from "react";
import { PreviewGame } from "@/components/PreviewGame";
import {
  buildOutlineSummary,
  buildQuestOutline,
  type QuestOutlineItem,
} from "@/lib/create/buildQuestOutline";
import {
  buildPreviewGamePack,
  previewMissionCount,
} from "@/lib/create/buildPreviewPack";
import {
  INTERVIEW_STEPS,
  mergeInterviewIntoDraft,
  type InterviewAnswers,
} from "@/lib/create/interview";

type Step = "interview" | "upload" | "generate" | "outline" | "preview";

const GENERATE_LABELS = [
  "문서 구조 분석…",
  "퀘스트 후보 추출 (AI 보조)…",
  "GamePack 초안 조립…",
  "Zod 검증…",
];

export function CreateWizard() {
  const [step, setStep] = useState<Step>("interview");
  const [answers, setAnswers] = useState<InterviewAnswers>({
    companyName: "Aurora Widgets",
    teamName: "People Experience",
    vibe: "playful",
    focus: "culture",
  });
  const [interviewIndex, setInterviewIndex] = useState(0);
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [generateIndex, setGenerateIndex] = useState(0);
  const [outline, setOutline] = useState<QuestOutlineItem[] | null>(null);
  const [previewPack, setPreviewPack] = useState<ReturnType<typeof buildPreviewGamePack> | null>(
    null,
  );

  const currentInterview = INTERVIEW_STEPS[interviewIndex];

  const stepLabels = useMemo(
    () => ({
      interview:
        interviewIndex + 1 >= INTERVIEW_STEPS.length
          ? "완료"
          : `질문 ${interviewIndex + 1}/${INTERVIEW_STEPS.length}`,
      upload: uploadName ? "업로드됨" : "대기",
      generate: outline ? "완료" : step === "generate" ? "진행 중" : "대기",
      outline: previewPack ? "확인됨" : outline ? "검토" : "대기",
      preview: previewPack ? `${previewMissionCount(previewPack)} missions` : "—",
    }),
    [generateIndex, interviewIndex, outline, previewPack, step, uploadName],
  );

  async function runGenerate() {
    setStep("generate");
    setGenerateIndex(0);
    for (let i = 0; i < GENERATE_LABELS.length; i++) {
      setGenerateIndex(i);
      await new Promise((r) => setTimeout(r, 500));
    }
    setOutline(buildQuestOutline(answers));
    setStep("outline");
  }

  function confirmOutline() {
    setPreviewPack(buildPreviewGamePack(answers));
    setStep("preview");
  }

  return (
    <div>
      <p style={{ color: "var(--fq-muted)", fontSize: "0.9rem" }}>
        <span className="fq-badge-draft">초안 · 미발행</span> 실제 고객/PII 업로드 금지 ·
        샘플 문서는 AI 보조 데모입니다 (PR-04에서 LLM API 연동).
      </p>

      <ol className="fq-stepper" data-testid="create-steps">
        <li data-testid="create-step-interview" aria-current={step === "interview" ? "step" : undefined}>
          1. 인터뷰 · {stepLabels.interview}
        </li>
        <li data-testid="create-step-upload" aria-current={step === "upload" ? "step" : undefined}>
          2. 문서 · {stepLabels.upload}
        </li>
        <li data-testid="create-step-visual" aria-current={step === "generate" ? "step" : undefined}>
          3. AI 초안 · {stepLabels.generate}
        </li>
        <li data-testid="create-step-outline" aria-current={step === "outline" ? "step" : undefined}>
          4. 퀘스트 검토 · {stepLabels.outline}
        </li>
        <li data-testid="create-step-generate" aria-current={step === "preview" ? "step" : undefined}>
          5. 미리보기 · {stepLabels.preview}
        </li>
      </ol>

      {step === "interview" && currentInterview && (
        <section data-testid="create-interview-panel">
          <label htmlFor="interview-field">{currentInterview.prompt}</label>
          <input
            id="interview-field"
            data-testid="create-interview-input"
            value={String(answers[currentInterview.id])}
            onChange={(e) =>
              setAnswers(
                mergeInterviewIntoDraft(answers, {
                  [currentInterview.id]: e.target.value,
                } as Partial<InterviewAnswers>),
              )
            }
            style={{ display: "block", width: "100%", maxWidth: 400, marginTop: 8, padding: 8 }}
          />
          <button
            type="button"
            className="fq-btn fq-btn-play"
            style={{ marginTop: 12 }}
            data-testid="create-interview-next"
            onClick={() => {
              if (interviewIndex + 1 >= INTERVIEW_STEPS.length) {
                setStep("upload");
              } else {
                setInterviewIndex((i) => i + 1);
              }
            }}
          >
            다음
          </button>
        </section>
      )}

      {step === "upload" && (
        <section data-testid="create-upload-panel">
          <p>샘플 MD만 사용하세요. 실제 고객/PII 금지.</p>
          <input
            type="file"
            accept=".md,text/markdown"
            data-testid="create-upload-input"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setUploadName(file?.name ?? null);
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              className="fq-btn fq-btn-ghost"
              data-testid="create-upload-sample"
              onClick={() => setUploadName("fictional-onboarding.md")}
            >
              bundled sample 사용
            </button>
            <button
              type="button"
              className="fq-btn fq-btn-play"
              data-testid="create-upload-continue"
              disabled={!uploadName}
              onClick={() => void runGenerate()}
            >
              AI 초안 만들기
            </button>
          </div>
        </section>
      )}

      {step === "generate" && (
        <p data-testid="create-status">{GENERATE_LABELS[generateIndex] ?? "…"}</p>
      )}

      {step === "outline" && outline && (
        <section data-testid="create-outline-panel" className="fq-outline">
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>퀘스트 초안</h2>
          <p data-testid="create-outline-summary" style={{ color: "var(--fq-muted)", fontSize: "0.9rem" }}>
            {buildOutlineSummary(answers)}
          </p>
          <ol data-testid="create-quest-outline">
            {outline.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> — {item.description}
              </li>
            ))}
          </ol>
          <p style={{ fontSize: "0.8rem", color: "var(--fq-muted)" }}>
            GamePack JSON은 Zod로 검증된 뒤 Phaser 미리보기에 연결됩니다.
          </p>
          <button
            type="button"
            className="fq-btn fq-btn-play"
            data-testid="create-outline-confirm"
            onClick={confirmOutline}
          >
            초안 확인 · 3미션 플레이
          </button>
        </section>
      )}

      {step === "preview" && previewPack && (
        <section data-testid="create-preview-panel">
          <p data-testid="create-status">
            {previewMissionCount(previewPack)}개 미션 미리보기 · {previewPack.meta.title}
            <span className="fq-badge-draft">발행 전</span>
          </p>
          <PreviewGame pack={previewPack} />
        </section>
      )}
    </div>
  );
}
