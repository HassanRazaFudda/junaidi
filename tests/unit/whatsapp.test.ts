import { describe, expect, it } from "vitest";
import { whatsappUrl } from "@/lib/whatsapp";

describe("whatsappUrl", () => {
  it("encodes package, season and travellers", () => {
    const url = whatsappUrl("+92 300 0000000", {
      packageName: "Short Hajj",
      season: "Hajj 2027",
      travellers: 2,
    });
    expect(url.startsWith("https://wa.me/923000000000?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toContain(
      "Short Hajj (Hajj 2027) for 2 travellers",
    );
  });

  it("falls back to a general inquiry when no package is given", () => {
    const url = whatsappUrl("923000000000", {});
    expect(decodeURIComponent(url.split("text=")[1]!)).toContain(
      "I'd like to ask about your services.",
    );
  });

  it("strips non-digit characters from the number", () => {
    const url = whatsappUrl("+92-300-0000000", {});
    expect(url.startsWith("https://wa.me/923000000000?")).toBe(true);
  });
});
