"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { defaultLocale, isLocale } from "@/i18n/config";

function localeFromPathname(pathname: string | null): string {
  if (!pathname) return defaultLocale;
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

export function LocaleHtmlAttributes() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = localeFromPathname(pathname);
    const root = document.documentElement;
    root.lang = locale === "ar" ? "ar" : "en";
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [pathname]);

  return null;
}
