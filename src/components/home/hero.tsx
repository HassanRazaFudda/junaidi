import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { HeroLoadSequenceEnhancer } from "@/components/home/hero-load-sequence.enhancer";
import { whatsappUrl } from "@/lib/whatsapp";
import { getCurrentHajjSeason, isCredentialConfirmed } from "@/content/queries";
import { pick } from "@/content/localize";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 2 + §6 sample copy. design.md §6: arch-framed video,
// actions "See Hajj 2027 packages" / "Message us on WhatsApp". The hero
// video/poster (H-01/H-02) isn't built yet — no real Hajj footage exists in
// the repo — so this renders the asset placeholder (ASSETS-NEEDED.md).
// data-hero / .hero-h1 / .hero-arch / .hero-actions are hooks for
// HeroLoadSequenceEnhancer (design.md §7.2's "Home load" sequence) —
// this markup is the complete, visible-by-default content either way.
export async function Hero({ locale, whatsappNumber }: { locale: Locale; whatsappNumber: string }) {
  const [t, season, credentialConfirmed] = await Promise.all([
    getTranslations("hero"),
    getCurrentHajjSeason(),
    isCredentialConfirmed("hajj-2027-al-wakeel"),
  ]);

  return (
    <Container
      data-hero
      className="grid gap-10 pt-10 pb-16 lg:grid-cols-2 lg:items-center lg:pt-16"
    >
      <div>
        <h1 className="hero-h1 font-display text-display">{t("headline")}</h1>
        {season && credentialConfirmed && (
          <p className="mt-4 max-w-prose text-lead text-stone">
            {pick(season.credentialLine, locale)}
          </p>
        )}
        <div className="hero-actions mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/hajj/2027"
            className={cn(
              buttonStyles.primary,
              "inline-flex min-h-12 items-center rounded-control px-5",
            )}
          >
            {t("ctaPackages")}
          </Link>
          <a
            href={whatsappUrl(whatsappNumber, {})}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonStyles.whatsapp,
              "inline-flex min-h-12 items-center gap-2 rounded-control px-5",
            )}
          >
            <WhatsAppIcon className="size-5" />
            {t("ctaWhatsapp")}
          </a>
        </div>
      </div>

      {/*
        fix.md §9.2 quick fix: arch clip-path removed (it read as an empty
        shape with no real footage behind it yet). hero-arch-reveal is kept
        as the class HeroLoadSequenceEnhancer's bottom-up reveal targets —
        Step 5 replaces this whole block with the full-bleed photo hero.
      */}
      <div className="hero-arch-reveal">
        <PlaceholderMedia
          assetId="H-01 / H-02"
          description="Hero portrait video loop + poster (client footage pending — guide.md §1.6)"
          aspect="aspect-[4/5]"
          className="rounded-panel"
        />
      </div>
      <HeroLoadSequenceEnhancer />
    </Container>
  );
}
