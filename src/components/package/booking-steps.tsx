import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";

// guide.md §5.2's four real booking steps, copied verbatim. Shared by
// /hajj/2027, the package detail template, the dedicated booking guide
// page, and (fix.md §7) the home page's dark Hajj 2027 band — guide.md §2
// rule 1: the Hajj CTA is never a payment button, only a link to the
// official portal. `dark` swaps text colours for the ink band; crimson
// step numbers stay crimson on both backgrounds.
export async function BookingSteps({
  portalUrl,
  id,
  dark = false,
}: {
  portalUrl: string;
  id?: string;
  dark?: boolean;
}) {
  const t = await getTranslations("bookingSteps");
  const body = dark ? "text-paper/90" : "text-ink";
  const link = dark ? "text-paper underline-offset-4 hover:text-paper/80" : "underline-offset-4";

  return (
    <div id={id}>
      <h2 className={cn("font-display text-h2", dark && "text-paper")}>{t("heading")}</h2>
      <ol className="mt-4 space-y-4">
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">1</span>
          <p className={cn("pt-1", body)}>{t("step1Title")}</p>
        </li>
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">2</span>
          <p className={cn("pt-1", body)}>
            {t("step2Title")}{" "}
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline", link)}
            >
              {portalUrl.replace(/^https?:\/\//, "")}
            </a>
            . {t("step2Body")}
          </p>
        </li>
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">3</span>
          <p className={cn("pt-1", body)}>{t("step3Title")}</p>
        </li>
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">4</span>
          <p className={cn("pt-1", body)}>
            {t("step4Title")}. {t("step4Body")}
          </p>
        </li>
      </ol>
    </div>
  );
}
