"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import * as m from "motion/react-m";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// Phase 1 only lists routes that exist yet — DECISIONS.md #5e.
const navLinks = [
  { href: "/hajj/2027", key: "hajj2027" },
  { href: "/about/credentials", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

// design.md §7.2: "Header hide/show | Motion | scroll direction |
// y: -100% / 0, 240ms, --ease-out | Always visible [reduced motion]."
// Content underneath (nav links, WhatsApp button) is the same server-
// rendered markup from Checkpoint 2 either way — this only adds the
// hide/show transform on top.
export function HeaderClient({
  brandName,
  whatsappNumber,
}: {
  brandName: string;
  whatsappNumber: string;
}) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const unsubscribe = scrollY.on("change", (y) => {
      const previous = scrollY.getPrevious() ?? y;
      setHidden(y > previous && y > 120);
    });
    return unsubscribe;
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", () => {
    if (open) setOpen(false);
  });

  return (
    <m.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-line bg-marble"
    >
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/junaidi-icon-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-display text-lg">{brandName}</span>
        </Link>

        <nav aria-label={t("nav.menu")} className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-small hover:text-crimson">
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl(whatsappNumber, {})}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-control border border-line px-4 text-small font-medium md:inline-flex"
          >
            <WhatsAppIcon className="size-5" />
            {t("header.whatsappCta")}
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-control md:hidden"
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
            <span className="sr-only">{t("nav.menu")}</span>
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label={t("nav.menu")}
        className={cn("border-t border-line bg-marble md:hidden", open ? "block" : "hidden")}
      >
        <Container className="flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="min-h-11 py-2 text-body"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <a
            href={whatsappUrl(whatsappNumber, {})}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-control border border-line px-4 text-small font-medium"
          >
            <WhatsAppIcon className="size-5" />
            {t("header.whatsappCta")}
          </a>
        </Container>
      </nav>
    </m.header>
  );
}
