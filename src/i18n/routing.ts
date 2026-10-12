import { defineRouting } from "next-intl/routing";

// Phase 1 is English-only (prompt.md scope), but every route already lives
// under the [locale] segment so Urdu is additive later: Phase 2 adds "ur"
// to this tuple once real (native-writer-reviewed, not machine-translated —
// guide.md §6) Urdu copy exists. Nothing else about the routing/content
// layer needs to change when that happens.
export const routing = defineRouting({
  locales: ["en"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed", // /hajj/2027 (en), /ur/hajj/2027 (ur, once added)
});

export type Locale = (typeof routing.locales)[number];
