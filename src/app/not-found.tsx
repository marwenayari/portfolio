"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getPageStrings } from "@/i18n/pageStrings";

function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return defaultLocale;
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

export default function NotFound() {
  const pathname = usePathname();
  const t = getPageStrings(localeFromPath(pathname));

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        {t.notFound404}
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {t.pageNotFound}
      </Heading>
      <Text onBackground="neutral-weak">{t.pageNotFoundDesc}</Text>
    </Column>
  );
}
