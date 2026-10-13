import { getSeasonBanner, getSiteSettings } from "@/content/queries";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

// fix.md §7: a persistent top bar (not just a conditional season banner) —
// the deadline message (when a season is active, left-aligned, linking
// through) plus landline/WhatsApp contact (always, right-aligned). design.md
// §6's "no countdown animation" still applies (code.md §6.1 computes the
// deadline inside a cacheLife("hours") function, so this stays static).
export async function SeasonStrip({ locale }: { locale: Locale }) {
  const [banner, site] = await Promise.all([getSeasonBanner(locale), getSiteSettings()]);

  return (
    <div className="bg-ink text-marble">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-caption">
        {banner ? (
          <Link href={banner.href} className="underline-offset-4 hover:underline">
            {banner.message}
          </Link>
        ) : (
          <span />
        )}
        <span className="flex items-center gap-4">
          <a href={`tel:${site.landline.replace(/\D/g, "")}`} className="hover:underline">
            {site.landline}
          </a>
          <a
            href={whatsappUrl(site.whatsappNumber, {})}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:underline"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </span>
      </Container>
    </div>
  );
}
