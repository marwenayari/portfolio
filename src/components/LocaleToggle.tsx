"use client";

import { usePathname, useRouter } from "next/navigation";
import { ToggleButton } from "@once-ui-system/core";
import { defaultLocale, isLocale, prefixLocalePath, type Locale } from "@/i18n/config";

function parseLocale(pathname: string | null): Locale {
  if (!pathname) return defaultLocale;
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

function swapPathLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return prefixLocalePath(next, "/");
  if (isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join("/")}`;
  }
  return prefixLocalePath(next, pathname === "/" ? "/" : pathname);
}

export function LocaleToggle() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const current = parseLocale(pathname);
  const next: Locale = current === "ar" ? "en" : "ar";
  const label = next === "ar" ? "Switch to Arabic" : "Switch to English";

  return (
    <ToggleButton
      prefixIcon="globe"
      onClick={() => router.replace(swapPathLocale(pathname, next))}
      aria-label={label}
    />
  );
}
