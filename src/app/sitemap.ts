import { getLocalizedPosts, getSharedSlugs } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { locales, prefixLocalePath, type Locale } from "@/i18n/config";

export default async function sitemap() {
  const blogSlugs = getSharedSlugs("blog");
  const workSlugs = getSharedSlugs("work");

  const blogs = locales.flatMap((locale: Locale) =>
    blogSlugs.map((slug) => ({
      url: `${baseURL}${prefixLocalePath(locale, "/blog")}/${slug}`,
      lastModified: getLocalizedPosts("blog", locale).find((p) => p.slug === slug)?.metadata
        .publishedAt,
    })),
  );

  const works = locales.flatMap((locale: Locale) =>
    workSlugs.map((slug) => ({
      url: `${baseURL}${prefixLocalePath(locale, "/work")}/${slug}`,
      lastModified: getLocalizedPosts("work", locale).find((p) => p.slug === slug)?.metadata
        .publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const localizedStaticRoutes = locales.flatMap((locale: Locale) =>
    activeRoutes.map((route) => ({
      url: `${baseURL}${route === "/" ? prefixLocalePath(locale, "/") : prefixLocalePath(locale, route)}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...localizedStaticRoutes, ...blogs, ...works];
}
