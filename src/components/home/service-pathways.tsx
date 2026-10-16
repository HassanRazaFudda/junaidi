import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal.client";
import { StaggerGrid } from "@/components/ui/stagger-grid.client";
import { Link } from "@/i18n/navigation";

// new-fixes.md §16 "Service pathways": three large cards (Umrah, Hajj
// 2027, Other travel services) so a first-time visitor sees all three
// core journeys at a glance, right after the trust strip — instead of
// having to scroll past the whole Umrah section before finding Hajj, or
// further still for Flights/Visa/Tours/Hotels. "Other travel services"
// has no dedicated page yet (DECISIONS.md #5e: nav only lists routes
// that exist), so per the spec's own fallback ("...in a simple secondary
// grid") it anchors straight to the existing ServicesCards section
// instead of a route that doesn't exist. Same approved review-build
// stock photography as Hero/CtaBand/ServicesCards (ASSETS-NEEDED.md) —
// reused here rather than sourcing anything new.
const cards = [
  {
    key: "umrah" as const,
    photo: {
      src: "https://images.pexels.com/photos/38461889/pexels-photo-38461889/free-photo-of-arial-view-of-makkah-skyline-and-mountains.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Makkah hotel district, aerial",
    },
  },
  {
    key: "hajj" as const,
    photo: {
      src: "https://images.pexels.com/photos/37676612/pexels-photo-37676612/free-photo-of-vast-desert-landscape-with-mountain-range.png?auto=compress&cs=tinysrgb&w=1200",
      alt: "Desert plain and mountains, illustrative",
    },
  },
  {
    key: "other" as const,
    photo: {
      src: "https://images.pexels.com/photos/35173466/pexels-photo-35173466/free-photo-of-aerial-view-of-clouds-through-airplane-window.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Clouds through an airplane window",
    },
  },
];

function CardBody({
  photo,
  label,
  description,
  cta,
}: {
  photo: { src: string; alt: string };
  label: string;
  description: string;
  cta: string;
}) {
  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-h3">{label}</h3>
        <p className="mt-2 text-small text-stone">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-small font-medium text-crimson">
          {cta}
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </div>
    </>
  );
}

const cardClassName =
  "card-hover group block h-full overflow-hidden rounded-card border border-line bg-paper";

export async function ServicePathways() {
  const t = await getTranslations("servicePathways");

  const items = cards.map((card) => {
    const label = t(`${card.key}.label`);
    const description = t(`${card.key}.description`);
    const cta = t(`${card.key}.cta`);
    const body = <CardBody photo={card.photo} label={label} description={description} cta={cta} />;

    // "Other travel services" has no dedicated route (see comment above),
    // so it's a plain same-page hash anchor, not the i18n Link — same
    // convention as package-header.tsx's "#how-booking-works" link.
    const node =
      card.key === "other" ? (
        <a href="#other-services" className={cardClassName}>
          {body}
        </a>
      ) : (
        <Link href={card.key === "umrah" ? "/umrah" : "/hajj/2027"} className={cardClassName}>
          {body}
        </Link>
      );

    return { id: card.key, node };
  });

  return (
    <Section>
      <Container>
        <Reveal>
          <p className="text-caption font-medium text-crimson">{t("eyebrow")}</p>
          <h2 className="font-display mt-1 text-h2">{t("heading")}</h2>
        </Reveal>
        <StaggerGrid className="mt-8 grid gap-6 sm:grid-cols-3" items={items} />
      </Container>
    </Section>
  );
}
