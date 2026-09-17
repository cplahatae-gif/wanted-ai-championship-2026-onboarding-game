import type { GamePack } from "gamepack-schema";
import type { GenerateJobRecord } from "./types";

type GlobalStore = {
  jobsById: Map<string, GenerateJobRecord>;
  idempotencyIndex: Map<string, string>;
  publishedBySlug: Map<string, { pack: GamePack; version: number }>;
};

const g = globalThis as unknown as { __firstQuestStore?: GlobalStore };

function store(): GlobalStore {
  if (!g.__firstQuestStore) {
    g.__firstQuestStore = {
      jobsById: new Map(),
      idempotencyIndex: new Map(),
      publishedBySlug: new Map(),
    };
  }
  return g.__firstQuestStore;
}

export function findJobByIdempotency(key: string): GenerateJobRecord | undefined {
  const id = store().idempotencyIndex.get(key);
  return id ? store().jobsById.get(id) : undefined;
}

export function getJob(jobId: string): GenerateJobRecord | undefined {
  return store().jobsById.get(jobId);
}

export function saveJob(job: GenerateJobRecord): void {
  const s = store();
  s.jobsById.set(job.id, job);
  s.idempotencyIndex.set(job.idempotencyKey, job.id);
}

export function getPublishedPack(slug: string): GamePack | undefined {
  return store().publishedBySlug.get(slug)?.pack;
}

export function publishPack(slug: string, pack: GamePack, version: number): void {
  store().publishedBySlug.set(slug, { pack, version });
}

export function resetStoreForTests(): void {
  g.__firstQuestStore = {
    jobsById: new Map(),
    idempotencyIndex: new Map(),
    publishedBySlug: new Map(),
  };
}
