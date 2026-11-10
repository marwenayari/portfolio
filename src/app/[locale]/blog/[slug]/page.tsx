import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
} from "@once-ui-system/core";
import { baseURL, getSiteContent } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getLocalizedPosts, getSharedSlugs } from "@/utils/utils";
import { Metadata } from "next";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { defaultLocale, isLocale, prefixLocalePath, locales, type Locale } from "@/i18n/config";
import { getPageStrings } from "@/i18n/pageStrings";

type PageProps = {
  params: Promise<{ locale: string; slug: string | string[] }>;
};

function resolveLocale(raw: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const slugs = getSharedSlugs("blog");
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const routeParams = await params;
  const locale = resolveLocale(routeParams.locale);
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getLocalizedPosts("blog", locale);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  const { blog } = getSiteContent(locale);

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${prefixLocalePath(locale, blog.path)}/${post.slug}`,
  });
}

export default async function BlogPost({ params }: PageProps) {
  const routeParams = await params;
  const locale = resolveLocale(routeParams.locale);
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getLocalizedPosts("blog", locale).find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const { blog, person, about } = getSiteContent(locale);
  const t = getPageStrings(locale);

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${prefixLocalePath(locale, blog.path)}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${prefixLocalePath(locale, about.path)}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href={prefixLocalePath(locale, blog.path)}>
              <Text variant="label-strong-m">{t.breadcrumbBlog}</Text>
            </SmartLink>
            <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, locale)}
            </Text>
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
            {post.metadata.subtitle && (
              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                align="center"
                style={{ fontStyle: "italic" }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>

          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}${prefixLocalePath(locale, blog.path)}/${post.slug}`}
          />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
              {t.recentPosts}
            </Text>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" locale={locale} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}