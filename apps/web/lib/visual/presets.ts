import type { GamePack } from "gamepack-schema";

export type IndustryPreset = {
  id: string;
  label: string;
  palette: [string, string, string];
  templateId: string;
  backgroundId: string;
};

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: "tech-startup",
    label: "IT · 스타트업",
    palette: ["#0f0f23", "#1a1a3e", "#00d9ff"],
    templateId: "office-topdown",
    backgroundId: "tech-open-plan",
  },
  {
    id: "manufacturing",
    label: "제조 · 현장",
    palette: ["#1c1c1c", "#3d3d3d", "#f5a623"],
    templateId: "office-topdown",
    backgroundId: "factory-floor",
  },
  {
    id: "finance",
    label: "금융 · 컴플라이언스",
    palette: ["#0d1b2a", "#1b263b", "#e0e1dd"],
    templateId: "office-topdown",
    backgroundId: "finance-tower",
  },
  {
    id: "healthcare",
    label: "헬스케어",
    palette: ["#f0f4f8", "#d9e2ec", "#27ab83"],
    templateId: "office-topdown",
    backgroundId: "clinic-welcome",
  },
  {
    id: "retail",
    label: "리테일 · 매장",
    palette: ["#2d1b69", "#512da8", "#ff6f91"],
    templateId: "office-topdown",
    backgroundId: "retail-floor",
  },
  {
    id: "education",
    label: "에듀 · 캠퍼스",
    palette: ["#1b4332", "#2d6a4f", "#95d5b2"],
    templateId: "office-topdown",
    backgroundId: "campus-quad",
  },
];

export function getPreset(id: string): IndustryPreset {
  return INDUSTRY_PRESETS.find((p) => p.id === id) ?? INDUSTRY_PRESETS[0]!;
}

export function applyVisualToPack(
  pack: GamePack,
  presetId: string,
  photoPalette?: [string, string, string],
): GamePack {
  const preset = getPreset(presetId);
  const palette = photoPalette ?? preset.palette;
  return {
    ...pack,
    visual: {
      palette,
      templateId: preset.templateId,
      backgroundId: photoPalette ? `${preset.backgroundId}-photo` : preset.backgroundId,
    },
  };
}

export function extractPaletteFromRgbSamples(samples: { r: number; g: number; b: number }[]): [string, string, string] {
  if (samples.length === 0) {
    return INDUSTRY_PRESETS[0]!.palette;
  }
  const avg = samples.reduce(
    (acc, s) => ({ r: acc.r + s.r, g: acc.g + s.g, b: acc.b + s.b }),
    { r: 0, g: 0, b: 0 },
  );
  const n = samples.length;
  const toHex = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v / n)))
      .toString(16)
      .padStart(2, "0");
  const base = `#${toHex(avg.r)}${toHex(avg.g)}${toHex(avg.b)}`;
  const accent = `#${toHex(avg.r * 0.7)}${toHex(avg.g * 0.7)}${toHex(Math.min(255, avg.b * 1.2))}`;
  const wall = `#${toHex(avg.r * 0.4)}${toHex(avg.g * 0.4)}${toHex(avg.b * 0.4)}`;
  return [base, wall, accent];
}
