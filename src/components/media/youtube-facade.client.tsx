"use client";

import { useEffect, useId, useRef, useState } from "react";
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
//
// onError alone isn't enough: a video with no maxres thumbnail doesn't
// always 404 cleanly — i.ytimg.com can respond 404 with a valid tiny
// 120×90 placeholder JPEG body, which the browser decodes successfully
// (no error event; onLoad fires like any normal image). Caught live:
// zM_GAKnPZZw/YhAEdfjsmgA both rendered that placeholder instead of
// falling back. Checked two ways, both needed: onLoad for a fresh network
// load, and a mount-time effect reading `img.complete`/`naturalWidth` off
// a ref for an already-cached image, whose load event can fire (from the
// browser's HTTP cache) before React finishes attaching the onLoad
// handler — caught live too, once the carousel below started rendering a
// second (duplicate) copy of each thumbnail and the cached first copy's
// fallback never re-ran.
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const hqThumb = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);
  const t = useTranslations("common");
  const layoutId = useId();

  const requestClose = () => setOpen(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth <= 120 && thumb !== hqThumb) {
      setThumb(hqThumb);
    }
  }, [thumb, hqThumb]);

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
            ref={imgRef}
            src={thumb}
            onError={() => setThumb(hqThumb)}
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth <= 120 && thumb !== hqThumb) {
                setThumb(hqThumb);
              }
            }}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-paper/90 group-hover:bg-paper">
              <Play aria-hidden className="size-6 translate-x-0.5 fill-crimson text-crimson" />
            </span>
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
