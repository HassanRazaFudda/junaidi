// Deliberately not `Locale` from "@/i18n/routing": that type currently has
// only one member ("en", DECISIONS.md #5c), which would make the `=== "ur"`
// check below a compile error. LocalizedText always carries an optional
// `ur` field regardless of which locales are routable yet, so this helper
// stays typed against both so it needs no change when Phase 2 adds "ur"
// back to routing.locales.
export const pick = (t: { en: string; ur?: string | undefined }, locale: "en" | "ur") =>
  (locale === "ur" && t.ur) || t.en;
