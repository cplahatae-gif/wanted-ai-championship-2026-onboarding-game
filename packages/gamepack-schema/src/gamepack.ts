import { z } from "zod";

export const Vec2Schema = z.object({
  x: z.number(),
  y: z.number(),
});

export const DialogueLineSchema = z.object({
  speaker: z.string().min(1),
  text: z.string().min(1),
});

export const DialogueChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  setFlag: z.string().min(1).optional(),
});

export const DialogueSchema = z.object({
  id: z.string().min(1),
  lines: z.array(DialogueLineSchema).min(1),
  choices: z.array(DialogueChoiceSchema).optional(),
});

export const NpcSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  position: Vec2Schema,
  dialogueId: z.string().min(1),
});

export const QuestObjectiveSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("talk"),
    npcId: z.string().min(1),
  }),
  z.object({
    type: z.literal("reach"),
    poiId: z.string().min(1),
  }),
  z.object({
    type: z.literal("flag"),
    flag: z.string().min(1),
  }),
  z.object({
    type: z.literal("interact"),
    poiId: z.string().min(1),
  }),
]);

export const QuestSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  prerequisiteIds: z.array(z.string()),
  objective: QuestObjectiveSchema,
  onCompleteFlags: z.array(z.string()).default([]),
});

export const PoiSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  position: Vec2Schema,
  radius: z.number().positive(),
});

export const VisualSchema = z.object({
  palette: z.tuple([
    z.string().regex(/^#[0-9a-fA-F]{6}$/),
    z.string().regex(/^#[0-9a-fA-F]{6}$/),
    z.string().regex(/^#[0-9a-fA-F]{6}$/),
  ]),
  templateId: z.string().min(1),
  backgroundId: z.string().min(1),
});

export const MapSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  spawn: Vec2Schema,
  tileSize: z.number().int().positive(),
});

export const MetaSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  companyName: z.string().min(1),
  version: z.string().min(1),
  locale: z.literal("ko"),
});

export const GamePackSchema = z.object({
  meta: MetaSchema,
  visual: VisualSchema,
  map: MapSchema,
  pois: z.array(PoiSchema).min(1),
  npcs: z.array(NpcSchema).min(1),
  dialogues: z.array(DialogueSchema).min(1),
  quests: z.array(QuestSchema).min(1),
});

export type GamePack = z.infer<typeof GamePackSchema>;
export type Quest = z.infer<typeof QuestSchema>;

export function parseGamePack(input: unknown): GamePack {
  return GamePackSchema.parse(input);
}

export function safeParseGamePack(input: unknown) {
  return GamePackSchema.safeParse(input);
}
