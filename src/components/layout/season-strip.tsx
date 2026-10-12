import { getSeasonBanner } from "@/content/queries";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";

// design.md §6: night background, marble text, one sentence + link. Hidden
// after the deadline. No countdown animation (code.md §6.1 computes the
// deadline inside a `cacheLife("hours")` function, so this stays static).
// stripMessage (guide.md §5.1) already reads as one full sentence ending in
// "See our packages," so the whole strip links through rather than
// repeating a second "See packages" label.
export async function SeasonStrip({ locale }: { locale: Locale }) {
  const banner = await getSeasonBanner(locale);
  if (!banner) return null;

  return (
    <div className="bg-ink text-marble">
      <Container className="py-3 text-center text-sm">
        <Link href={banner.href} className="underline-offset-4 hover:underline">
          {banner.message}
        </Link>
      </Container>
    </div>
  );
}
