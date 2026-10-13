"use client";

import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";

// fix.md §7/§8: desktop-only floating WhatsApp button (mobile already has
// StickyContactBar's Call/WhatsApp bar, so this would duplicate it there —
// fix.md §7 explicitly says the sticky bar "replaces the floating button"
// on mobile). Gentle scale-in after 2s, no bouncing loop; MotionConfig's
// reducedMotion="user" makes this instant under reduced motion.
export function FloatingWhatsApp({ whatsappNumber }: { whatsappNumber: string }) {
  const [show, setShow] = useState(false);
  const t = useTranslations("header");

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <m.a
      href={whatsappUrl(whatsappNumber, {})}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed end-6 bottom-6 z-30 hidden min-h-12 items-center gap-2 rounded-full bg-whatsapp px-4 text-whatsapp-ink shadow-[0_18px_40px_-18px_rgba(17,23,38,0.35)] md:inline-flex"
    >
      <WhatsAppIcon className="size-6" />
      <span className="font-medium">{t("chatWithUs")}</span>
    </m.a>
  );
}
