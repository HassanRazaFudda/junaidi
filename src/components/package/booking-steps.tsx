import { getTranslations } from "next-intl/server";

// guide.md §5.2's four real booking steps, copied verbatim. Shared by
// /hajj/2027, the package detail template, and the dedicated booking guide
// page — guide.md §2 rule 1: the Hajj CTA is never a payment button, only
// a link to the official portal.
export async function BookingSteps({ portalUrl, id }: { portalUrl: string; id?: string }) {
  const t = await getTranslations("bookingSteps");

  return (
    <div id={id}>
      <h2 className="font-display text-h2">{t("heading")}</h2>
      <ol className="mt-4 space-y-4">
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">1</span>
          <p className="pt-1">{t("step1Title")}</p>
        </li>
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">2</span>
          <p className="pt-1">
            {t("step2Title")}{" "}
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {portalUrl.replace(/^https?:\/\//, "")}
            </a>
            . {t("step2Body")}
          </p>
        </li>
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">3</span>
          <p className="pt-1">{t("step3Title")}</p>
        </li>
        <li className="flex gap-4">
          <span className="font-display text-h3 text-crimson">4</span>
          <p className="pt-1">
            {t("step4Title")}. {t("step4Body")}
          </p>
        </li>
      </ol>
    </div>
  );
}
