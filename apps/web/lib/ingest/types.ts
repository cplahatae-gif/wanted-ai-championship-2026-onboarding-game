export type SourceChunk = {
  id: string;
  heading: string;
  text: string;
};

export type QuestDraftFromDoc = {
  id: string;
  title: string;
  description: string;
  sourceRefs: string[];
};
