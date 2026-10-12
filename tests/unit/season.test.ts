import { describe, expect, it } from "vitest";
import { daysUntil, isPastDeadline, isPackageExpired } from "@/lib/season";

const DAY = 1000 * 60 * 60 * 24;

describe("season helpers", () => {
  it("daysUntil counts whole days remaining", () => {
    const now = Date.parse("2026-11-01T00:00:00+05:00");
    expect(daysUntil("2026-11-20T23:59:00+05:00", now)).toBe(20);
  });

  it("daysUntil is negative once the deadline has passed", () => {
    const now = Date.parse("2026-12-01T00:00:00+05:00");
    expect(daysUntil("2026-11-20T23:59:00+05:00", now)).toBeLessThan(0);
  });

  it("isPastDeadline flips exactly at the deadline", () => {
    const deadline = "2026-11-20T23:59:00+05:00";
    expect(isPastDeadline(deadline, Date.parse(deadline) - 1)).toBe(false);
    expect(isPastDeadline(deadline, Date.parse(deadline) + 1)).toBe(true);
  });

  it("isPackageExpired compares against validUntil", () => {
    const validUntil = "2027-01-01";
    expect(isPackageExpired(validUntil, Date.parse(validUntil) - DAY)).toBe(false);
    expect(isPackageExpired(validUntil, Date.parse(validUntil) + DAY)).toBe(true);
  });
});
