import type { GamePack } from "gamepack-schema";

export type JobStatus = "Parsing" | "Structuring" | "Validating" | "Ready" | "Failed";

export type GenerateJobRecord = {
  id: string;
  idempotencyKey: string;
  status: JobStatus;
  phaseLabel: string;
  interview: {
    companyName: string;
    teamName: string;
    vibe: "playful" | "formal" | "tech";
    focus: "culture" | "tools" | "security";
  };
  visualPresetId: string;
  documentName: string;
  pack: GamePack | null;
  draftPack: GamePack | null;
  reviewConfirmed: boolean;
  publishedSlug: string | null;
  publishVersion: number;
  error: string | null;
  createdAt: number;
  updatedAt: number;
};

export type StartGenerateBody = {
  idempotencyKey: string;
  interview: GenerateJobRecord["interview"];
  documentText: string;
  documentName: string;
  visualPresetId?: string;
  photoPalette?: [string, string, string];
};
