import "server-only";
import { cacheLife } from "next/cache";

// Next 16's Cache Components model treats `new Date()` as an unstable
// prerender-time value (code.md §0 rule 3 — static by default). The
// copyright year only needs to be this fresh, not live, so it's cached
// rather than rendered on the client or made the page dynamic.
export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
