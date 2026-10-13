import "server-only";
import type { z } from "zod";
import type { Video } from "@/content/schema";

// Real, already-published YouTube IDs cited in guide.md §1.6 — not
// invented. But guide.md explicitly flags these as "reported, not yet
// opened by us... Open each one before using it," and guide.md §2 rules
// 7–8 require consent-on-file for any identifiable face and forbid fake
// people — neither of which this agent can verify without watching the
// footage. `openedAndReviewed: false` on every row, and the local adapter
// filters listVideos() to openedAndReviewed only, so none render until a
// human actually screens each video and flips the flag. See CLIENT-TODO.md.
//
// G3-Y2EFkwps was added by fix.md §5.2, which asked to "verify each ID
// loads" — confirmed via browser: it's real, titled "Junaidi Group Our
// exclusive Hajj package offers the best location," on the client's actual
// "Junaidi Air Travels" channel (55.5K subscribers). "Loads" and "reviewed
// for consent/face-visibility compliance" are different bars, though —
// this still needs the same human review as the other four before
// openedAndReviewed flips to true.
export const videos: z.input<typeof Video>[] = [
  {
    youtubeId: "kvf_3_NYtSY",
    title: { en: "Special Hajj packages, Hajj 2024" },
    seasonLabel: "Hajj 2024",
    season: "hajj-2024",
    category: "hajj",
    openedAndReviewed: false,
  },
  {
    youtubeId: "zM_GAKnPZZw",
    title: { en: "VIP/Deluxe halls in Arafat, Hajj 2025" },
    seasonLabel: "Hajj 2025",
    season: "hajj-2025",
    category: "hajj",
    openedAndReviewed: false,
  },
  {
    youtubeId: "YhAEdfjsmgA",
    title: { en: "VIP camps in Mina, Hajj 2025" },
    seasonLabel: "Hajj 2025",
    season: "hajj-2025",
    category: "hajj",
    openedAndReviewed: false,
  },
  {
    youtubeId: "m6SOo712028",
    title: { en: "Junaidi Group — brand clip" },
    seasonLabel: "2024",
    season: "brand",
    category: "brand",
    openedAndReviewed: false,
  },
  {
    youtubeId: "G3-Y2EFkwps",
    title: { en: "Junaidi Group — our exclusive Hajj package offers the best location" },
    seasonLabel: "Hajj",
    season: "hajj-2025",
    category: "hajj",
    openedAndReviewed: false,
  },
];
