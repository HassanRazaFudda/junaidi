import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Reveal } from "@/components/ui/reveal.client";
import { StaggerGrid } from "@/components/ui/stagger-grid.client";
import { getSiteSettings } from "@/content/queries";
import { whatsappUrl } from "@/lib/whatsapp";

// fix.md §2/§7: "Other services as image cards: air tickets, visas, tours,
// hotels." None of these have a dedicated page yet (DECISIONS.md #5e: nav
// only lists routes that exist) — guide.md and the existing `services.*`
// i18n keys already confirm these are real services Junaidi offers, so the
// cards themselves aren't invented, only their deep-link target is missing.
// Rather than link to a page that doesn't exist, each card opens a
// WhatsApp chat pre-filled with that service, same conversion pattern as
// every other CTA on the site. Photo credits: ASSETS-NEEDED.md.
const cards = [
  {
    key: "flights" as const,
    photo: {
      src: "https://images.pexels.com/photos/35173466/pexels-photo-35173466/free-photo-of-aerial-view-of-clouds-through-airplane-window.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Clouds through an airplane window",
    },
  },
  {
    key: "visa" as const,
    photo: {
      src: "https://images.pexels.com/photos/261621/pexels-photo-261621.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Signing a document, close up",
    },
  },
  {
    key: "tours" as const,
    photo: {
      src: "https://images.pexels.com/photos/14529110/pexels-photo-14529110.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "City skyline at dusk",
    },
  },
  {
    key: "hotels" as const,
    photo: {
      src: "https://images.pexels.com/photos/39338444/pexels-photo-39338444/free-photo-of-modern-hotel-bedroom-with-sleek-minimalist-design.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Modern hotel bedroom",
    },
  },
];

export async function ServicesCards() {
  const [t, site] = await Promise.all([getTranslations("servicesCards"), getSiteSettings()]);

  return (
    <Section>
      <Container>
        <Reveal>
          <p className="text-caption font-medium text-crimson">{t("eyebrow")}</p>
          <h2 className="font-display mt-1 text-h2">{t("heading")}</h2>
        </Reveal>
        <StaggerGrid
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          items={cards.map((card) => ({
            id: card.key,
            node: (
              <a
                href={whatsappUrl(site.whatsappNumber, { topic: t(`${card.key}.topic`) })}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group block overflow-hidden rounded-card border border-line bg-paper"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 300px, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <span className="font-medium">{t(`${card.key}.label`)}</span>
                  <WhatsAppIcon className="size-4 shrink-0 text-whatsapp-ink/70" />
                </div>
              </a>
            ),
          }))}
        />
      </Container>
    </Section>
  );
}
