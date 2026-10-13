import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buttonStyles } from "@/components/ui/button";
import { getSiteSettings } from "@/content/queries";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// fix.md §7: "[CTA BAND — ink + photo] 'Talk to our Hajj & Umrah desk'
// phone · WhatsApp · office hours." Office hours omitted — unconfirmed,
// same reasoning as components/home/office.tsx.
export async function CtaBand() {
  const [t, site] = await Promise.all([getTranslations(), getSiteSettings()]);

  return (
    <Section className="bg-ink text-marble">
      <Container className="text-center">
        <h2 className="font-display text-h2">{t("ctaBand.heading")}</h2>
        <p className="mt-2 text-lead text-marble/80">{t("ctaBand.body")}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappUrl(site.whatsappNumber, {})}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonStyles.whatsapp,
              "inline-flex min-h-12 items-center gap-2 rounded-control px-5",
            )}
          >
            <WhatsAppIcon className="size-5" />
            {t("header.whatsappCta")}
          </a>
          <a
            href={`tel:${site.landline.replace(/\D/g, "")}`}
            className={cn(
              buttonStyles.ghost,
              "inline-flex min-h-12 items-center rounded-control px-5",
            )}
          >
            {site.landline}
          </a>
        </div>
      </Container>
    </Section>
  );
}
