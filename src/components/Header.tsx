"use client";

import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, getSiteContent } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";
import styles from "./Header.module.scss";
import { defaultLocale, isLocale, prefixLocalePath, type Locale } from "@/i18n/config";

type TimeDisplayProps = {
  timeZone: string;
  locale: Locale;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale }) => {
  const [currentTime, setCurrentTime] = useState("");
  const intlLocale = locale === "ar" ? "ar-TN" : "en-GB";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(intlLocale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, intlLocale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

function useHeaderLocale(): Locale {
  const params = useParams();
  const raw = params?.locale;
  if (typeof raw === "string" && isLocale(raw)) return raw;
  return defaultLocale;
}

export const Header = () => {
  const pathname = usePathname() ?? "";
  const locale = useHeaderLocale();
  const { person, about, blog, work } = getSiteContent(locale);
  const p = (path: string) => prefixLocalePath(locale, path);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href={p("/")} selected={pathname === p("/")} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={p("/about")}
                      label={about.label}
                      selected={pathname.startsWith(p("/about"))}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={p("/about")}
                      selected={pathname.startsWith(p("/about"))}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href={p("/work")}
                      label={work.label}
                      selected={pathname.startsWith(p("/work"))}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href={p("/work")}
                      selected={pathname.startsWith(p("/work"))}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={p("/blog")}
                      label={blog.label}
                      selected={pathname.startsWith(p("/blog"))}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={p("/blog")}
                      selected={pathname.startsWith(p("/blog"))}
                    />
                  </Row>
                </>
              )}
              <>
                <Line background="neutral-alpha-medium" vert maxHeight="24" />
                <LocaleToggle />
                {display.themeSwitcher && <ThemeToggle />}
              </>
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} locale={locale} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
