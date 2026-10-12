import type { z } from "zod";
import type {
  LocalizedText,
  ImageRef,
  Hotel,
  Package,
  Season,
  Credential,
  Review,
  Video,
  SiteSettings,
} from "./schema";

export type LocalizedText = z.infer<typeof LocalizedText>;
export type ImageRef = z.infer<typeof ImageRef>;
export type Hotel = z.infer<typeof Hotel>;
export type Package = z.infer<typeof Package>;
export type Season = z.infer<typeof Season>;
export type Credential = z.infer<typeof Credential>;
export type Review = z.infer<typeof Review>;
export type Video = z.infer<typeof Video>;
export type SiteSettings = z.infer<typeof SiteSettings>;
