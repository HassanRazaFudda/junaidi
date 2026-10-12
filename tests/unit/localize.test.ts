import { describe, expect, it } from "vitest";
import { pick } from "@/content/localize";

describe("pick", () => {
  it("returns the Urdu string when locale is ur and ur exists", () => {
    expect(pick({ en: "Hello", ur: "ہیلو" }, "ur")).toBe("ہیلو");
  });

  it("falls back to English when locale is ur but no ur translation exists", () => {
    expect(pick({ en: "Hello" }, "ur")).toBe("Hello");
  });

  it("returns English when locale is en", () => {
    expect(pick({ en: "Hello", ur: "ہیلو" }, "en")).toBe("Hello");
  });
});
