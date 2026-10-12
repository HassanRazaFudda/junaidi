"use client";

import { useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

// Native <dialog>: focus-trapped and Esc-closes for free, satisfying
// design.md §6's Evidence drawer spec without any JS animation library.
// Styled to sit at the inline-end edge via ::backdrop + dialog positioning.
// Checkpoint 3 layers the slide-in Motion transition (design.md §7.2) on
// top of this same open/close mechanism.
export function Drawer({
  trigger,
  title,
  children,
}: {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const t = useTranslations("common");

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className="text-start">
        {trigger}
      </button>
      <dialog
        ref={ref}
        aria-labelledby="drawer-title"
        className="m-0 ms-auto h-dvh max-h-dvh w-full max-w-md rounded-none bg-paper p-0 shadow-[0_20px_60px_rgba(17,23,38,0.18)] backdrop:bg-ink/40 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 id="drawer-title" className="text-h3">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex size-11 items-center justify-center rounded-control"
          >
            <X aria-hidden />
            <span className="sr-only">{t("close")}</span>
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
      </dialog>
    </>
  );
}
