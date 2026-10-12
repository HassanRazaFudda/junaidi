"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

// code.md §10.3: render the thumbnail with a play button; load the
// youtube-nocookie.com iframe only on click. Saves ~500 KB+ per embed.
// Every embed shows its season label (guide.md §1.6 — never imply footage
// is from a season other than its own).
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

  return (
    <figure className="w-72 shrink-0 snap-start">
      <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-ink">
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
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="288px"
              className="object-cover"
            />
            <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-paper/90 group-hover:bg-paper">
              <Play aria-hidden className="translate-x-0.5 fill-ink text-ink" />
            </span>
            <span className="sr-only">{title}</span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-small text-stone">
        {title} — <span className="font-medium text-ink">{seasonLabel}</span>
      </figcaption>
    </figure>
  );
}
