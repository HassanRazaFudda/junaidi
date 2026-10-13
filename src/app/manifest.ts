import type { MetadataRoute } from "next";

// Icons use the client's real icon mark (brand/junaidi-icon-mark.png,
// ASSETS-NEEDED.md) at its native resolution — no generated sizes yet
// since only one source raster exists.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Junaidi Group",
    short_name: "Junaidi",
    description: "Hajj and Umrah from Karachi, with a team that travels with you.",
    start_url: "/",
    display: "standalone",
    background_color: "#eceeea",
    theme_color: "#111726",
    icons: [{ src: "/brand/junaidi-icon-mark.png", sizes: "3810x3810", type: "image/png" }],
  };
}
