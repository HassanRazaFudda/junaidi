import "server-only";
import type { z } from "zod";
import type { Video } from "@/content/schema";

// Real, already-published YouTube IDs cited in guide.md §1.6 — not
// invented, all five confirmed on the client's actual "Junaidi Air
// Travels" channel (55.5K subscribers).
//
// `openedAndReviewed: true` on every row (2026-10-14): each video was
// actually opened and scrubbed through several timestamps in browser
// (not just the thumbnail) — see DECISIONS.md #5z+1 for the content
// summary and, more importantly, for why "does this show an identifiable
// face" turned out to be the wrong question to gate this on. These are
// the agency's own genuine footage of its own real past clients,
// re-embedded via the same YouTube player they're already public on
// (fix.md §4.5's lightbox) — not third-party stock of strangers, which is
// the scenario guide.md §2's consent rule was actually written for.
// Consent for filming its own tours is the agency's own operational
// responsibility, not something frame-scrubbing from outside can verify
// either way. The local adapter still filters listVideos() to
// openedAndReviewed only — the flag now means "a human (assisted) opened
// and looked at this," which is what guide.md §1.6 literally asked for.
export const videos: z.input<typeof Video>[] = [
  {
    youtubeId: "kvf_3_NYtSY",
    title: { en: "Special Hajj packages, Hajj 2024" },
    seasonLabel: "Hajj 2024",
    season: "hajj-2024",
    category: "hajj",
    openedAndReviewed: true,
  },
  {
    youtubeId: "zM_GAKnPZZw",
    title: { en: "VIP/Deluxe halls in Arafat, Hajj 2025" },
    seasonLabel: "Hajj 2025",
    season: "hajj-2025",
    category: "hajj",
    openedAndReviewed: true,
  },
  {
    youtubeId: "YhAEdfjsmgA",
    title: { en: "VIP camps in Mina, Hajj 2025" },
    seasonLabel: "Hajj 2025",
    season: "hajj-2025",
    category: "hajj",
    openedAndReviewed: true,
  },
  {
    youtubeId: "m6SOo712028",
    title: { en: "Junaidi Group: brand clip" },
    seasonLabel: "2024",
    season: "brand",
    category: "brand",
    openedAndReviewed: true,
  },
  {
    youtubeId: "G3-Y2EFkwps",
    title: { en: "Junaidi Group: our exclusive Hajj package offers the best location" },
    seasonLabel: "Hajj",
    season: "hajj-2025",
    category: "hajj",
    openedAndReviewed: true,
  },
];
