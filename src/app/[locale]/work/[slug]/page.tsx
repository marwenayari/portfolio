import { notFound } from "next/navigation";
import { getLocalizedPosts, getSharedSlugs } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
} from "@once-ui-system/core";
import { baseURL, getSiteContent } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { defaultLocale, isLocale, prefixLocalePath, locales, type Locale } from "@/i18n/config";
import { getPageStrings } from "@/i18n/pageStrings";

type PageProps = {
  params: Promise<{ locale: string; slug: string | string[] }>;
};

function resolveLocale(raw: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const slugs = getSharedSlugs("work");
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const routeParams = await params;
  const locale = resolveLocale(routeParams.locale);
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getLocalizedPosts("work", locale);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  const { work } = getSiteContent(locale);

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${prefixLocalePath(locale, work.path)}/${post.slug}`,
  });
}

export default async function Project({ params }: PageProps) {
  const routeParams = await params;
  const locale = resolveLocale(routeParams.locale);
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getLocalizedPosts("work", locale).find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((member) => ({
      src: member.avatar,
    })) || [];

  const { work, about, person } = getSiteContent(locale);
  const t = getPageStrings(locale);

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${prefixLocalePath(locale, work.path)}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${prefixLocalePath(locale, about.path)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={prefixLocalePath(locale, work.path)}>
          <Text variant="label-strong-m">{t.breadcrumbProjects}</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, locale)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
