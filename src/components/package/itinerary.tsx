import { pick } from "@/content/localize";
import type { Package } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// design.md §6: "Vertical line in --line, day labels in --brass-deep" →
// crimson per the token reconciliation (DECISIONS.md #1).
export function Itinerary({
  itinerary,
  locale,
}: {
  itinerary: Package["itinerary"];
  locale: Locale;
}) {
  if (itinerary.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-h2">Day by day</h2>
      <ol className="mt-4 space-y-6 border-s-2 border-line ps-6">
        {itinerary.map((day) => (
          <li key={day.day}>
            <p className="font-medium text-crimson">{day.day}</p>
            <p className="font-medium">{pick(day.title, locale)}</p>
            <p className="mt-1 text-stone">{pick(day.detail, locale)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
