import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal.client";
import { getSiteSettings } from "@/content/queries";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// fix.md §7: "[CTA BAND — ink + photo] 'Talk to our Hajj & Umrah desk'
// phone · WhatsApp · office hours." Office hours omitted — unconfirmed,
// same reasoning as components/home/office.tsx. §6.2: "CTA band: Haram
// night, heavily darkened." Same high-aerial-at-night photo as the hero
// (no identifiable individual — DECISIONS.md). Credit: ASSETS-NEEDED.md.
export async function CtaBand() {
  const [t, site] = await Promise.all([getTranslations(), getSiteSettings()]);

  return (
    <Section className="relative overflow-hidden bg-ink text-marble">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.pexels.com/photos/36954370/pexels-photo-36954370/free-photo-of-aerial-view-of-mecca-s-grand-mosque-at-night.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-h2">{t("ctaBand.heading")}</h2>
          <p className="mt-2 text-lead text-marble/80">{t("ctaBand.body")}</p>
        </Reveal>
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
