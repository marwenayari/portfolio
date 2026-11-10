import { getLocalizedPosts } from "@/utils/utils";
import { baseURL, getSiteContent } from "@/resources";
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, prefixLocalePath, type Locale } from "@/i18n/config";

export async function GET(request: NextRequest) {
  const localeParam = request.nextUrl.searchParams.get("locale");
  const locale: Locale =
    localeParam && isLocale(localeParam) ? localeParam : defaultLocale;

  const { blog, person } = getSiteContent(locale);
  const posts = getLocalizedPosts("blog", locale);

  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
  });

  const blogBase = `${baseURL}${prefixLocalePath(locale, blog.path)}`;

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blog.title}</title>
    <link>${blogBase}</link>
    <description>${blog.description}</description>
    <language>${locale === "ar" ? "ar" : "en"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/api/rss?locale=${locale}" rel="self" type="application/rss+xml" />
    <managingEditor>${person.email || "noreply@example.com"} (${
    person.name
  })</managingEditor>
    <webMaster>${person.email || "noreply@example.com"} (${
    person.name
  })</webMaster>
    <image>
      <url>${baseURL}${person.avatar || "/images/avatar.png"}</url>
      <title>${blog.title}</title>
      <link>${blogBase}</link>
    </image>
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <title>${post.metadata.title}</title>
      <link>${blogBase}/${post.slug}</link>
      <guid>${blogBase}/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.metadata.summary}]]></description>
      ${
        post.metadata.image
          ? `<enclosure url="${baseURL}${post.metadata.image}" type="image/jpeg" />`
          : ""
      }
      ${post.metadata.tag ? `<category>${post.metadata.tag}</category>` : ""}
      <author>${person.email || "noreply@example.com"} (${person.name})</author>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
