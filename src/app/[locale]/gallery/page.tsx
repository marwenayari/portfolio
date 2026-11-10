import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, getSiteContent } from "@/resources";
import { defaultLocale, isLocale, prefixLocalePath, type Locale } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string }> };

function resolveLocale(raw: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const { gallery } = getSiteContent(locale);

  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: prefixLocalePath(locale, gallery.path),
  });
}

export default async function Gallery({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const { gallery, person } = getSiteContent(locale);

  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={prefixLocalePath(locale, gallery.path)}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${prefixLocalePath(locale, gallery.path)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView images={gallery.images} />
    </Flex>
  );
}
