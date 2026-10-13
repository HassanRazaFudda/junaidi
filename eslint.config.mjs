import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "scripts/**", // throwaway dev utilities (e.g. visual-review screenshots), not app code
  ]),
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["framer-motion"], message: "Use 'motion/react'." },
            {
              group: ["@/content/local/*"],
              message: "Import content through '@/content/queries' only.",
            },
          ],
          paths: [
            {
              name: "gsap",
              message: "Import GSAP dynamically inside a client enhancer (see code.md §11).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.enhancer.tsx", "src/lib/gsap.ts"],
    rules: { "no-restricted-imports": "off" },
  },
  {
    // Tests may reach into content/local/* directly (e.g. to test the
    // adapter's filtering behaviour below the 'use cache' wrapper), where
    // app/ code must always go through content/queries.ts.
    files: ["tests/**/*.ts", "tests/**/*.tsx"],
    rules: { "no-restricted-imports": "off" },
  },
]);
