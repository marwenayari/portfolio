import type { Locale } from "@/i18n/config";
import { siteBundleAr } from "./ar";
import { siteBundleEn } from "./en";

export type SiteContent = typeof siteBundleEn;

export function getSiteContent(locale: Locale): SiteContent {
  return locale === "ar" ? siteBundleAr : siteBundleEn;
}
