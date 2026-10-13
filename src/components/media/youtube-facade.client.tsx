"use client";

import { useId, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

// code.md §10.3 + fix.md §4.5/§8: thumbnail with a play button, dark
// gradient, title + season label overlaid; clicking opens a lightbox
// (youtube-nocookie iframe) with a shared-layout expand from the
// thumbnail's own position/size (`layoutId`, unique per instance via
// `useId` so multiple cards in the same carousel don't share one
// animation). Native `<dialog>` gives free focus-trap/Esc-close and reuses
// globals.css's existing `dialog::backdrop` fade — the same pattern as
// `ui/drawer.client.tsx`: the dialog shell is an invisible, transparent
// box: Motion drives the real visual transition.
//
// Every embed shows its season label (guide.md §1.6 — never imply footage
// is from a season other than its own). Plain <img> (not next/image) for
// the thumbnail specifically, since it needs an onError fallback from
// maxresdefault to hqdefault — not every video has a maxres thumbnail, and
// next/image's loader doesn't support a runtime fallback chain.
export function YoutubeFacade({
  youtubeId,
  title,
  seasonLabel,
}: {
  youtubeId: string;
  title: string;
  seasonLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);
  const t = useTranslations("common");
  const layoutId = useId();

  const requestClose = () => setOpen(false);

  return (
    <>
      <figure className="w-80 shrink-0 snap-start">
        <m.button
          type="button"
          layoutId={layoutId}
          onClick={() => {
            dialogRef.current?.showModal();
            setOpen(true);
          }}
          className="group relative block aspect-video w-full overflow-hidden rounded-card bg-ink text-start"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- onError fallback chain, see comment above */}
          <img
            src={thumb}
            onError={() => setThumb(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-paper/90 group-hover:bg-paper">
            <Play aria-hidden className="size-6 translate-x-0.5 fill-crimson text-crimson" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-3 text-start text-marble">
            <span className="block text-small font-medium">{title}</span>
            <span className="block text-caption text-marble/80">{seasonLabel}</span>
          </span>
          <span className="sr-only">{title}</span>
        </m.button>
      </figure>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onCancel={(e) => {
          e.preventDefault();
          requestClose();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) requestClose();
        }}
        className="m-auto w-full max-w-3xl overflow-visible rounded-card bg-transparent p-0"
      >
        <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
          {open && (
            <m.div
              layoutId={layoutId}
              className="relative aspect-video overflow-hidden rounded-card bg-ink"
            >
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                type="button"
                onClick={requestClose}
                className="absolute end-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-ink/70 text-marble hover:bg-ink"
              >
                <X aria-hidden />
                <span className="sr-only">{t("close")}</span>
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
