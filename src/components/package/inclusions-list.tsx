import { Check, Minus } from "lucide-react";
import { pick } from "@/content/localize";
import type { LocalizedText } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// design.md §6: "Two columns: 'Included' with a small brass [crimson] tick,
// 'Not included' with a stone dash. Text, not icons alone."
export function InclusionsList({
  included,
  notIncluded,
  locale,
}: {
  included: LocalizedText[];
  notIncluded: LocalizedText[];
  locale: Locale;
}) {
  if (included.length === 0 && notIncluded.length === 0) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="font-medium">Included</h3>
        <ul className="mt-3 space-y-2">
          {included.map((item) => (
            <li key={pick(item, locale)} className="flex items-start gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-crimson" />
              <span>{pick(item, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium">Not included</h3>
        <ul className="mt-3 space-y-2">
          {notIncluded.map((item) => (
            <li key={pick(item, locale)} className="flex items-start gap-2">
              <Minus aria-hidden className="mt-0.5 size-4 shrink-0 text-stone" />
              <span>{pick(item, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
