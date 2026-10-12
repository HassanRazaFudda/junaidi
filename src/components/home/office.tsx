import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PlaceholderMedia } from "@/components/media/placeholder-media";
import { getSiteSettings } from "@/content/queries";

// guide.md §5.1 row 9: "Physical trust. Photo of real office, map, hours,
// phones." Office hours aren't given anywhere in guide.md — omitted rather
// than guessed (CLIENT-TODO.md). O-01 (office photo) is a pending shoot
// (design.md §11), so this renders the asset placeholder.
export async function Office() {
  const [t, site] = await Promise.all([getTranslations("office"), getSiteSettings()]);

  return (
    <Section className="border-t border-line">
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-h2">{t("heading")}</h2>
          <address className="mt-4 text-lead text-stone not-italic">
            {site.office.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4">
            <span className="text-stone">{t("landline")}: </span>
            <a href={`tel:${site.landline.replace(/\D/g, "")}`} className="hover:text-crimson">
              {site.landline}
            </a>
          </p>
        </div>
        <PlaceholderMedia
          assetId="O-01"
          description="Mona Square office entrance + front desk photo (pending shoot — design.md §11)"
          aspect="aspect-[3/2]"
        />
      </Container>
    </Section>
  );
}
