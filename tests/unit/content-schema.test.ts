import { describe, expect, it } from "vitest";
import { z } from "zod";
import { Package, Season, Credential, Review, Video, SiteSettings } from "@/content/schema";
import { packages } from "@/content/local/data/packages";
import { seasons } from "@/content/local/data/seasons";
import { credentials } from "@/content/local/data/credentials";
import { reviews } from "@/content/local/data/reviews";
import { videos } from "@/content/local/data/videos";
import { site } from "@/content/local/data/site";
import { examplePackage } from "../fixtures/example-package";

describe("content data files parse against their schemas", () => {
  it("packages.ts", () => expect(() => z.array(Package).parse(packages)).not.toThrow());
  it("seasons.ts", () => expect(() => z.array(Season).parse(seasons)).not.toThrow());
  it("credentials.ts", () => expect(() => z.array(Credential).parse(credentials)).not.toThrow());
  it("reviews.ts", () => expect(() => z.array(Review).parse(reviews)).not.toThrow());
  it("videos.ts", () => expect(() => z.array(Video).parse(videos)).not.toThrow());
  it("site.ts", () => expect(() => SiteSettings.parse(site)).not.toThrow());
  it("the test fixture package (schema sanity only — never imported by app/)", () =>
    expect(() => Package.parse(examplePackage)).not.toThrow());
});
