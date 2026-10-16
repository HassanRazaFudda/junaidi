"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { submitInquiry, type InquiryState } from "@/components/forms/actions";
import { buttonStyles } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { status: "idle" };

// fix.md §4.2: "Paper card, 16px radius, overlapping the hero bottom by
// 50% on desktop, below the hero on mobile." The overlap positioning
// lives on the wrapper in hero.tsx (this component is just the card
// itself); min/max travellers and the service list reuse the same
// vocabulary as the full contact form (src/components/forms/actions.ts).
export function InquiryBar() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const t = useTranslations("inquiryBar");
  const tForm = useTranslations("form");

  return (
    <div className="rounded-card border border-line bg-paper p-5 shadow-[0_18px_40px_-18px_rgba(17,23,38,0.35)] sm:p-6">
      <AnimatePresence mode="wait">
        {state.status === "sent" ? (
          <m.p
            key="sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-2 text-center font-medium text-ok"
          >
            {t("sent")}
          </m.p>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            action={formAction}
            className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_1fr_auto] sm:items-end"
            noValidate
          >
            {state.status === "error" && (
              <p role="alert" className="text-caption text-alert sm:col-span-5">
                {t("errorHeading")}
              </p>
            )}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="ib-company">Company</label>
              <input id="ib-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <label className="text-caption">
              <span className="mb-1 block text-stone">{t("service")}</span>
              <select
                name="service"
                required
                defaultValue=""
                className="min-h-12 w-full rounded-control border border-line bg-paper px-3 text-small"
              >
                <option value="" disabled>
                  {t("service")}
                </option>
                <option value="hajj">{tForm("serviceHajj")}</option>
                <option value="umrah">{tForm("serviceUmrah")}</option>
                <option value="flights">{tForm("serviceFlights")}</option>
                <option value="visa">{tForm("serviceVisa")}</option>
                <option value="holiday">{tForm("serviceHoliday")}</option>
              </select>
            </label>

            <label className="text-caption">
              <span className="mb-1 block text-stone">{t("month")}</span>
              <input
                name="month"
                type="text"
                maxLength={30}
                className="min-h-12 w-full rounded-control border border-line bg-paper px-3 text-small"
              />
            </label>

            <label className="text-caption">
              <span className="mb-1 block text-stone">{t("travellers")}</span>
              <input
                name="travellers"
                type="number"
                required
                min={1}
                max={60}
                defaultValue={1}
                className="min-h-12 w-20 rounded-control border border-line bg-paper px-3 text-small"
              />
            </label>

            <label className="text-caption">
              <span className="mb-1 block text-stone">{t("whatsappNumber")}</span>
              <input
                name="phone"
                type="tel"
                required
                className="min-h-12 w-full rounded-control border border-line bg-paper px-3 text-small"
              />
            </label>

            <button
              type="submit"
              disabled={pending}
              className={cn(
                buttonStyles.primary,
                "min-h-12 rounded-control px-5 disabled:opacity-50",
              )}
            >
              {pending ? t("sending") : t("getQuote")}
            </button>

            <p className="text-caption text-stone sm:col-span-5">
              {tForm("consentText")}{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-crimson">
                {tForm("consentPrivacyLink")}
              </Link>
              .
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
