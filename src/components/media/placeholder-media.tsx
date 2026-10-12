// prompt.md hard rule: no AI-generated or stock images of the Kaaba, the
// Haram mosques, or people, and nothing downloaded from the web. Every
// unbuilt design.md §10 asset slot renders this instead — a neutral block
// with the asset ID and intended content as a caption, visible only in
// development (never shipped to a visitor). See ASSETS-NEEDED.md.
export function PlaceholderMedia({
  assetId,
  description,
  aspect = "aspect-[4/5]",
  className,
}: {
  assetId: string;
  description: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex ${aspect} items-end justify-start overflow-hidden rounded-panel bg-[linear-gradient(135deg,var(--color-marble),var(--color-haze))] p-4 ${className ?? ""}`}
    >
      {process.env.NODE_ENV !== "production" && (
        <p className="rounded-control bg-paper/80 px-2 py-1 text-caption text-stone">
          {assetId} — {description}
        </p>
      )}
    </div>
  );
}
