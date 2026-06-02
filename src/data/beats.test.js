import { describe, it, expect } from "vitest";
import { beats, BEATSTARS_ROOT } from "./beats";

describe("beats data", () => {
  it("exports a non-empty array of beats", () => {
    expect(Array.isArray(beats)).toBe(true);
    expect(beats.length).toBeGreaterThan(0);
  });

  it("every beat has the required shape", () => {
    for (const beat of beats) {
      expect(beat).toHaveProperty("id");
      expect(typeof beat.id).toBe("number");
      expect(typeof beat.title).toBe("string");
      expect(beat.title.length).toBeGreaterThan(0);
      expect(Array.isArray(beat.genre)).toBe(true);
      expect(beat.genre.length).toBeGreaterThan(0);
      expect(typeof beat.bpm).toBe("number");
      expect(beat.bpm).toBeGreaterThan(0);
      expect(typeof beat.youtubeId).toBe("string");
      expect(typeof beat.price).toBe("number");
      expect(beat.price).toBeGreaterThanOrEqual(0);
    }
  });

  it("uses bare YouTube video IDs, not full URLs", () => {
    for (const beat of beats) {
      expect(beat.youtubeId).not.toMatch(/^https?:\/\//);
      expect(beat.youtubeId).not.toContain("youtu.be");
      expect(beat.youtubeId).not.toContain("?");
    }
  });

  it("has unique IDs", () => {
    const ids = beats.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("exports a BeatStars root URL", () => {
    expect(BEATSTARS_ROOT).toMatch(/^https:\/\/(www\.)?beatstars\.com\//);
  });
});
