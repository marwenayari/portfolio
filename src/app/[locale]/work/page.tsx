import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, getSiteContent } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { defaultLocale, isLocale, prefixLocalePath, type Locale } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(raw: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const { work } = getSiteContent(locale);

  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: prefixLocalePath(locale, work.path),
  });
}

export default async function Work({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const { work, about, person } = getSiteContent(locale);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={prefixLocalePath(locale, work.path)}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${prefixLocalePath(locale, about.path)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects locale={locale} />
    </Column>
  );
}
