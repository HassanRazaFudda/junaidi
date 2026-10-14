import { Inter, Noto_Nastaliq_Urdu, Amiri } from "next/font/google";

// new-fixes.md §12/§18: "a modern, highly legible sans-serif such as
// Inter or Manrope" for interface/body copy, replacing v3's Archivo.
// Inter chosen over Manrope — slightly more neutral/widely used, no
// variable-width axis to reconcile with the old .font-display treatment.
export const archivo = Inter({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
  preload: false, // only preloaded by the Urdu layout, once Phase 2 adds it
});

export const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});
