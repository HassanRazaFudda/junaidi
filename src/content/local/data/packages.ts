import "server-only";
import type { z } from "zod";
import type { Package } from "@/content/schema";

// Empty by design, not a placeholder oversight. guide.md §3 lists the Hajj
// 2027 package specifics (name, duration, price, hotels, distances, Mina/
// Arafat category, flights, inclusions/exclusions) as "Blocking Phase 1" —
// none have arrived from the client yet. The hard rule against inventing
// content applies even to draft rows: a structurally meaningful draft
// Package would still need a fabricated name/price/hotel. So there are zero
// rows here, and the package-detail template is instead built and tested
// against tests/fixtures/example-package.ts, which is never imported by
// app/. See DECISIONS.md #5 and CLIENT-TODO.md.
export const packages: z.input<typeof Package>[] = [];
