import "server-only";
import type { z } from "zod";
import type { Review } from "@/content/schema";

/**
 * fix.md §5.2: "3, sample: true, generic first names, no photos." Demo-
 * mode-only, never shown in live mode (src/content/local/adapter.ts) —
 * these are not real customers and must never be presented as real
 * reviews. `consent: false` is intentional: it's not that consent was
 * refused, it's that there's no real person here to have consented
 * (schema.ts's superRefine only requires true consent for non-sample
 * reviews).
 */
export const sampleReviews: z.input<typeof Review>[] = [
  {
    id: "sample-review-1",
    author: "Ahmed (sample)",
    season: "Hajj 2025",
    text: {
      en: "Sample testimonial for layout review only — not a real review. Replace with a real, consented quote before launch.",
    },
    source: "direct",
    date: "2025-09-01",
    consent: false,
    sample: true,
  },
  {
    id: "sample-review-2",
    author: "Sana (sample)",
    season: "Umrah 2025",
    text: {
      en: "Sample testimonial for layout review only — not a real review. Replace with a real, consented quote before launch.",
    },
    source: "google",
    date: "2025-06-15",
    consent: false,
    sample: true,
  },
  {
    id: "sample-review-3",
    author: "Bilal (sample)",
    season: "Hajj 2024",
    text: {
      en: "Sample testimonial for layout review only — not a real review. Replace with a real, consented quote before launch.",
    },
    source: "facebook",
    date: "2024-08-20",
    consent: false,
    sample: true,
  },
];
