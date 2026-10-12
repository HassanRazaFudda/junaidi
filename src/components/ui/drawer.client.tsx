"use client";

import { useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

// Native <dialog>: focus-trapped and Esc-closes for free, satisfying
// design.md §6's Evidence drawer spec. design.md §7.2: "slides from
// inline-end, 400ms; backdrop fades 240ms" (backdrop handled in CSS —
// globals.css). The panel itself animates with Motion: closing is
// deferred until the slide-out finishes (onExitComplete) before the
// native dialog actually closes, so Esc/backdrop and the button both
// play the same exit animation.
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
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  const requestClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
        className="text-start"
      >
        {trigger}
      </button>
      <dialog
        ref={ref}
        aria-labelledby="drawer-title"
        onCancel={(e) => {
          // Esc pressed: play the exit animation instead of closing instantly.
          e.preventDefault();
          requestClose();
        }}
        className="m-0 ms-auto h-dvh max-h-dvh w-full max-w-md overflow-visible rounded-none bg-transparent p-0"
      >
        <AnimatePresence onExitComplete={() => ref.current?.close()}>
          {open && (
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-dvh max-h-dvh w-full max-w-md flex-col bg-paper shadow-[0_20px_60px_rgba(17,23,38,0.18)]"
            >
              <div className="flex items-center justify-between border-b border-line p-5">
                <h2 id="drawer-title" className="text-h3">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={requestClose}
                  className="inline-flex size-11 items-center justify-center rounded-control"
                >
                  <X aria-hidden />
                  <span className="sr-only">{t("close")}</span>
                </button>
              </div>
              <div className="overflow-y-auto p-5">{children}</div>
            </m.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
