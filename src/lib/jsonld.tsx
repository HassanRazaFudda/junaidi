import type { Thing, WithContext } from "schema-dts";

// JSON-LD requires a raw <script> tag; `data` is always server-built from
// our own validated content (never user input), and `<` is escaped below.
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
