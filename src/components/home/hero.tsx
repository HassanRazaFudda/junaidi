import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { InquiryBar } from "@/components/home/inquiry-bar.client";
import { HeroLoadSequenceEnhancer } from "@/components/home/hero-load-sequence.enhancer";
import { whatsappUrl } from "@/lib/whatsapp";
import { getCurrentHajjSeason, isCredentialConfirmed } from "@/content/queries";
import { pick } from "@/content/localize";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

// fix.md §2/§3.2/§7: full-bleed photo hero, 92vh desktop / 80svh mobile,
// ink gradient overlay, Talbiyah in Amiri, H1, subhead, 3 CTAs, and the
// inquiry bar overlapping the hero's bottom edge on desktop. Photo credit:
// ASSETS-NEEDED.md (Ben Latif / Unsplash — review-build-only licensed
// stock, DECISIONS.md's imagery exception).
//
// data-hero / .hero-bg / .hero-overlay-scroll / .hero-talbiyah / .hero-h1 /
// .hero-sub / .hero-actions / .hero-inquiry are hooks for
// HeroLoadSequenceEnhancer (fix.md §8's "Hero load"/"Hero scroll" rows).
// The SSR markup below is fully visible without it — the enhancer only
// ever animates already-present content, never hides it in CSS.
export async function Hero({ locale, whatsappNumber }: { locale: Locale; whatsappNumber: string }) {
  const [t, season, credentialConfirmed] = await Promise.all([
    getTranslations("hero"),
    getCurrentHajjSeason(),
    isCredentialConfirmed("hajj-2027-al-wakeel"),
  ]);

  return (
    <section data-hero>
      <div className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 -z-10">
          <div className="hero-bg absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1778567090660-6becd8b28312?q=80&w=1920&auto=format&fit=crop"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(17,23,38,.35) 0%, rgba(17,23,38,.75) 100%)",
            }}
          />
          <div className="hero-overlay-scroll absolute inset-0 bg-ink" />
        </div>

        <Container className="flex min-h-[80svh] flex-col justify-end gap-5 pt-28 pb-16 lg:min-h-[92vh] lg:pb-28">
          <p dir="rtl" lang="ar" className="hero-talbiyah font-arabic text-[28px] text-paper/80">
            لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
          </p>
          <h1 className="hero-h1 font-display text-display text-paper">{t("headline")}</h1>
          <p className="hero-sub max-w-prose text-lead text-paper/85">{t("subhead")}</p>
          {season && credentialConfirmed && (
            <p className="max-w-prose text-small text-paper/70">
              {pick(season.credentialLine, locale)}
            </p>
          )}
          <div className="hero-actions mt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/umrah"
              className={cn(
                buttonStyles.primary,
                "inline-flex min-h-12 items-center rounded-control px-5",
              )}
            >
              {t("ctaUmrah")}
            </Link>
            <Link
              href="/hajj/2027"
              className={cn(
                buttonStyles.ghost,
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
        </Container>
      </div>

      <Container className="hero-inquiry relative z-10 py-10 lg:-mt-20 lg:py-0">
        <InquiryBar />
      </Container>
      <HeroLoadSequenceEnhancer />
    </section>
  );
}
