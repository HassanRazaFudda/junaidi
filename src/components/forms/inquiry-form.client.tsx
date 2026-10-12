"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitInquiry, type InquiryState } from "./actions";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { status: "idle" };

const services = ["hajj", "umrah", "flights", "visa", "holiday", "other"] as const;

const serviceMessageKeys = {
  hajj: "serviceHajj",
  umrah: "serviceUmrah",
  flights: "serviceFlights",
  visa: "serviceVisa",
  holiday: "serviceHoliday",
  other: "serviceOther",
} as const;

// code.md §12.1: native <form action>, works without JS. Labels above
// fields, errors in --alert with a fix instruction, honeypot field hidden
// from sighted and screen-reader users alike. guide.md §5.9: never collect
// passport or CNIC numbers.
export function InquiryForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const t = useTranslations("form");
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "sent") {
    return (
      <div className="rounded-panel border border-line bg-paper p-6">
        <p className="font-medium">{t("sent")}</p>
        <p className="mt-2 text-stone">{t("sentBody")}</p>
        <a
          href={whatsappUrl(whatsappNumber, {})}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-12 items-center rounded-control border border-ink px-5 font-medium"
        >
          {t("continueOnWhatsapp")}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      {state.status === "error" && (
        <p role="alert" className="text-alert">
          {t("errorHeading")}
        </p>
      )}

      {/* Honeypot: hidden from sighted and keyboard/screen-reader users. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label={t("name")} name="name" errors={errors?.name} required>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          className={inputClass}
        />
      </Field>

      <Field label={t("phone")} name="phone" errors={errors?.phone} required>
        <input id="phone" name="phone" type="tel" required className={inputClass} />
      </Field>

      <Field label={t("service")} name="service" errors={errors?.service} required>
        <select id="service" name="service" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            {t("service")}
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {t(serviceMessageKeys[s])}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("city")} name="city" errors={errors?.city}>
          <input id="city" name="city" type="text" maxLength={60} className={inputClass} />
        </Field>
        <Field label={t("month")} name="month" errors={errors?.month}>
          <input id="month" name="month" type="text" maxLength={30} className={inputClass} />
        </Field>
      </div>

      <Field label={t("travellers")} name="travellers" errors={errors?.travellers} required>
        <input
          id="travellers"
          name="travellers"
          type="number"
          required
          min={1}
          max={60}
          defaultValue={1}
          className={inputClass}
        />
      </Field>

      <Field label={t("message")} name="message" errors={errors?.message}>
        <textarea id="message" name="message" rows={4} maxLength={1000} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-5 font-medium text-marble disabled:opacity-50"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

const inputClass =
  "min-h-12 w-full rounded-control border border-line bg-paper px-3 text-body focus-visible:outline-crimson";

function Field({
  label,
  name,
  errors,
  required,
  children,
}: {
  label: string;
  name: string;
  errors?: string[] | undefined;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-small font-medium">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
      {errors?.map((err) => (
        <p key={err} className={cn("mt-1 text-caption text-alert")}>
          {err}
        </p>
      ))}
    </div>
  );
}
