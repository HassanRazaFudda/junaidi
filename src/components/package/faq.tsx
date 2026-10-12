import { Accordion } from "@/components/ui/accordion.client";
import { pick } from "@/content/localize";
import type { LocalizedText } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function Faq({
  faqs,
  locale,
}: {
  faqs: { q: LocalizedText; a: LocalizedText }[];
  locale: Locale;
}) {
  if (faqs.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-h2">FAQ</h2>
      <div className="mt-4">
        <Accordion
          items={faqs.map((f, i) => ({
            id: String(i),
            question: pick(f.q, locale),
            answer: pick(f.a, locale),
          }))}
        />
      </div>
    </div>
  );
}
