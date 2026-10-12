import "server-only";
import type { z } from "zod";
import type { Review } from "@/content/schema";

// Empty by design. guide.md §5.1 row 8: reviews are "hidden until real
// reviews exist" — and Review.consent is a non-fabricatable literal `true`,
// so there is no honest way to seed a placeholder row here. The Reviews
// home section renders null when this list is empty. See CLIENT-TODO.md
// (Google Business Profile access + permission to embed reviews).
export const reviews: z.input<typeof Review>[] = [];
