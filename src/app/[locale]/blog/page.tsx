import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, getSiteContent } from "@/resources";
import { defaultLocale, isLocale, prefixLocalePath, type Locale } from "@/i18n/config";
import { getPageStrings } from "@/i18n/pageStrings";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(raw: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const { blog, person } = getSiteContent(locale);

  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: prefixLocalePath(locale, blog.path),
  });
}

export default async function Blog({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const { blog, person } = getSiteContent(locale);
  const t = getPageStrings(locale);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={prefixLocalePath(locale, blog.path)}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${prefixLocalePath(locale, blog.path)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail locale={locale} />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" locale={locale} />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {t.earlierPosts}
        </Heading>
        <Posts range={[4]} columns="2" locale={locale} />
      </Column>
    </Column>
  );
}
