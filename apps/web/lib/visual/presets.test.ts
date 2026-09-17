import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { extractPaletteFromRgbSamples, getPreset } from "./presets";

describe("visual presets", () => {
  it("returns six presets", () => {
    assert.ok(getPreset("manufacturing").palette);
  });

  it("extracts hex palette from samples", () => {
    const palette = extractPaletteFromRgbSamples([
      { r: 100, g: 120, b: 140 },
      { r: 80, g: 90, b: 100 },
    ]);
    assert.match(palette[0], /^#[0-9a-f]{6}$/i);
  });
});
