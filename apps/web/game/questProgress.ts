import type { GamePack, Quest } from "gamepack-schema";

export type QuestProgress = {
  completedQuestIds: string[];
  flags: Set<string>;
};

const DEFAULT_STORAGE_KEY = "first-quest-neulbom-progress-v1";

let activeStorageKey = DEFAULT_STORAGE_KEY;

export function setProgressStorageKey(key: string): void {
  activeStorageKey = key;
}

export function getProgressStorageKey(): string {
  return activeStorageKey;
}

export function createInitialProgress(): QuestProgress {
  return { completedQuestIds: [], flags: new Set() };
}

export function serializeProgress(progress: QuestProgress): string {
  return JSON.stringify({
    completedQuestIds: progress.completedQuestIds,
    flags: [...progress.flags],
  });
}

export function deserializeProgress(raw: string | null): QuestProgress {
  if (!raw) return createInitialProgress();
  try {
    const parsed = JSON.parse(raw) as {
      completedQuestIds?: string[];
      flags?: string[];
    };
    return {
      completedQuestIds: parsed.completedQuestIds ?? [],
      flags: new Set(parsed.flags ?? []),
    };
  } catch {
    return createInitialProgress();
  }
}

export function loadProgressFromStorage(key = activeStorageKey): QuestProgress {
  if (typeof window === "undefined") return createInitialProgress();
  return deserializeProgress(window.localStorage.getItem(key));
}

export function saveProgressToStorage(progress: QuestProgress, key = activeStorageKey): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, serializeProgress(progress));
}

export function isQuestUnlocked(quest: Quest, progress: QuestProgress): boolean {
  return quest.prerequisiteIds.every((id) =>
    progress.completedQuestIds.includes(id),
  );
}

export function getActiveQuest(
  pack: GamePack,
  progress: QuestProgress,
): Quest | null {
  for (const quest of pack.quests) {
    if (progress.completedQuestIds.includes(quest.id)) continue;
    if (!isQuestUnlocked(quest, progress)) continue;
    return quest;
  }
  return null;
}

export function isObjectiveMet(
  pack: GamePack,
  quest: Quest,
  progress: QuestProgress,
  context: {
    talkedNpcIds: Set<string>;
    visitedPoiIds: Set<string>;
  },
): boolean {
  switch (quest.objective.type) {
    case "talk":
      return context.talkedNpcIds.has(quest.objective.npcId);
    case "reach":
      return context.visitedPoiIds.has(quest.objective.poiId);
    case "flag":
      return progress.flags.has(quest.objective.flag);
    case "interact":
      return context.visitedPoiIds.has(`${quest.objective.poiId}:interact`);
    default:
      return false;
  }
}

export function completeQuest(
  progress: QuestProgress,
  quest: Quest,
): QuestProgress {
  if (progress.completedQuestIds.includes(quest.id)) return progress;
  const flags = new Set(progress.flags);
  for (const flag of quest.onCompleteFlags ?? []) {
    flags.add(flag);
  }
  return {
    completedQuestIds: [...progress.completedQuestIds, quest.id],
    flags,
  };
}

export function setFlag(progress: QuestProgress, flag: string): QuestProgress {
  const flags = new Set(progress.flags);
  flags.add(flag);
  return { ...progress, flags };
}

export function allQuestsComplete(
  pack: GamePack,
  progress: QuestProgress,
): boolean {
  return pack.quests.every((q) => progress.completedQuestIds.includes(q.id));
}

export function npcById(pack: GamePack, npcId: string) {
  return pack.npcs.find((n) => n.id === npcId);
}

export function poiById(pack: GamePack, poiId: string) {
  return pack.pois.find((p) => p.id === poiId);
}
