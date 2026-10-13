"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// code.md §10.3 + fix.md §4.5: thumbnail with a play button, dark gradient,
// title + season label overlaid; loads the youtube-nocookie.com iframe
// only on click (saves ~500 KB+ per embed). Every embed shows its season
// label (guide.md §1.6 — never imply footage is from a season other than
// its own). Plain <img> (not next/image) for the thumbnail specifically,
// since it needs an onError fallback from maxresdefault to hqdefault —
// not every video has a maxres thumbnail, and next/image's loader doesn't
// support a runtime fallback chain.
export function YoutubeFacade({
  youtubeId,
  title,
  seasonLabel,
}: {
  youtubeId: string;
  title: string;
  seasonLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);

  return (
    <figure className="w-80 shrink-0 snap-start">
      <div className="relative aspect-video overflow-hidden rounded-card bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
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
          </button>
        )}
      </div>
    </figure>
  );
}
