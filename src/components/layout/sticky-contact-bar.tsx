import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/content/queries";

// code.md §10.3 touch-target rule: ≥44×44px. Fixed to the viewport bottom
// on mobile only — guide.md §2.4 "WhatsApp always one tap away."
export async function StickyContactBar() {
  const [t, site] = await Promise.all([getTranslations("stickyContactBar"), getSiteSettings()]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-line bg-paper md:hidden">
      <a
        href={whatsappUrl(site.whatsappNumber, {})}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-center gap-2 border-e border-line py-3 text-small font-medium"
      >
        <WhatsAppIcon className="size-5" />
        {t("whatsapp")}
      </a>
      <a
        href={`tel:${site.landline.replace(/\D/g, "")}`}
        className="flex min-h-12 items-center justify-center gap-2 py-3 text-small font-medium"
      >
        <Phone aria-hidden className="size-5" />
        {t("call")}
      </a>
    </div>
  );
}
