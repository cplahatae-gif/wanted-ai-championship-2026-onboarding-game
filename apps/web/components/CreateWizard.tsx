"use client";

import { useMemo, useState } from "react";
import { PreviewGame } from "@/components/PreviewGame";
import {
  buildPreviewGamePack,
  previewMissionCount,
} from "@/lib/create/buildPreviewPack";
import {
  INTERVIEW_STEPS,
  mergeInterviewIntoDraft,
  type InterviewAnswers,
} from "@/lib/create/interview";

type Step = "interview" | "upload" | "generate" | "preview";

const GENERATE_LABELS = [
  "문서 파싱 중…",
  "GamePack 초안 작성…",
  "미션 3개 미리보기 준비…",
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
  const [previewPack, setPreviewPack] = useState<ReturnType<typeof buildPreviewGamePack> | null>(
    null,
  );

  const currentInterview = INTERVIEW_STEPS[interviewIndex];

  const stepLabels = useMemo(
    () => ({
      interview: interviewIndex + 1 >= INTERVIEW_STEPS.length ? "완료" : `질문 ${interviewIndex + 1}/${INTERVIEW_STEPS.length}`,
      upload: uploadName ? "업로드됨" : "대기",
      generate: previewPack ? "준비됨" : "대기",
      preview: previewPack ? `${previewMissionCount(previewPack)} missions` : "—",
    }),
    [generateIndex, interviewIndex, previewPack, uploadName],
  );

  async function runGenerate() {
    setStep("generate");
    setGenerateIndex(0);
    for (let i = 0; i < GENERATE_LABELS.length; i++) {
      setGenerateIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }
    const pack = buildPreviewGamePack(answers);
    setPreviewPack(pack);
    setStep("preview");
  }

  return (
    <div>
      <ol data-testid="create-steps">
        <li data-testid="create-step-interview" aria-current={step === "interview" ? "step" : undefined}>
          인터뷰 · {stepLabels.interview}
        </li>
        <li data-testid="create-step-upload" aria-current={step === "upload" ? "step" : undefined}>
          문서 업로드 · {stepLabels.upload}
        </li>
        <li data-testid="create-step-visual" aria-current={step === "generate" ? "step" : undefined}>
          생성 · {stepLabels.generate}
        </li>
        <li data-testid="create-step-generate" aria-current={step === "preview" ? "step" : undefined}>
          미리보기 · {stepLabels.preview}
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
          />
          <button
            type="button"
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
          <button
            type="button"
            data-testid="create-upload-sample"
            onClick={() => setUploadName("fictional-onboarding.md")}
          >
            bundled sample 사용
          </button>
          <button
            type="button"
            data-testid="create-upload-continue"
            disabled={!uploadName}
            onClick={() => void runGenerate()}
          >
            생성 시작
          </button>
        </section>
      )}

      {step === "generate" && (
        <p data-testid="create-status">{GENERATE_LABELS[generateIndex] ?? "…"}</p>
      )}

      {step === "preview" && previewPack && (
        <section data-testid="create-preview-panel">
          <p data-testid="create-status">
            {previewMissionCount(previewPack)}개 미션 미리보기 · {previewPack.meta.title}
          </p>
          <PreviewGame pack={previewPack} />
        </section>
      )}
    </div>
  );
}
