export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `/en/about` → `/about`; `/en` → `/`; `/about` → `/about` */
export function stripLocalePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (!isLocale(segments[0])) {
    return pathname.startsWith("/") ? pathname : `/${pathname}`;
  }
  const rest = segments.slice(1);
  if (rest.length === 0) return "/";
  return `/${rest.join("/")}`;
}

/** `/about` + `en` → `/en/about` */
export function prefixLocalePath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${p}`;
}
