import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { whatsappUrl } from "@/lib/whatsapp";
import { getCurrentHajjSeason, isCredentialConfirmed } from "@/content/queries";
import { pick } from "@/content/localize";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

// guide.md §5.1 row 2 + §6 sample copy. design.md §6: arch-framed video,
// actions "See Hajj 2027 packages" / "Message us on WhatsApp". The hero
// video/poster (H-01/H-02) isn't built yet — no real Hajj footage exists in
// the repo — so this renders the asset placeholder (ASSETS-NEEDED.md).
export async function Hero({ locale, whatsappNumber }: { locale: Locale; whatsappNumber: string }) {
  const [t, season, credentialConfirmed] = await Promise.all([
    getTranslations("hero"),
    getCurrentHajjSeason(),
    isCredentialConfirmed("hajj-2027-al-wakeel"),
  ]);

  return (
    <Container className="grid gap-10 pt-10 pb-16 lg:grid-cols-2 lg:items-center lg:pt-16">
      <div>
        <h1 className="font-display text-display">{t("headline")}</h1>
        {season && credentialConfirmed && (
          <p className="mt-4 max-w-prose text-lead text-stone">
            {pick(season.credentialLine, locale)}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-4">
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
              buttonStyles.secondary,
              "inline-flex min-h-12 items-center gap-2 rounded-control px-5",
            )}
          >
            <WhatsAppIcon className="size-5" />
            {t("ctaWhatsapp")}
          </a>
        </div>
      </div>

      <div style={{ clipPath: "url(#hero-arch)" }}>
        <svg width="0" height="0" aria-hidden>
          <clipPath id="hero-arch" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.45 C0,0.18 0.22,0 0.5,0 C0.78,0 1,0.18 1,0.45 L1,1 Z" />
          </clipPath>
        </svg>
        <PlaceholderMedia
          assetId="H-01 / H-02"
          description="Hero portrait video loop + poster (client footage pending — guide.md §1.6)"
          aspect="aspect-[4/5]"
        />
      </div>
    </Container>
  );
}
