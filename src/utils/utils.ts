import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type PostMetadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

export type PostData = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

function readMDXFile(filePath: string): { metadata: PostMetadata; content: string } {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: PostMetadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string): PostData[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const mdxFiles = fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");

  return mdxFiles.map((file) => {
    const filePath = path.join(dir, file);
    const { metadata, content } = readMDXFile(filePath);
    const slug = path.basename(file, path.extname(file));
    return { metadata, content, slug };
  });
}

export function getLocalizedPosts(kind: "blog" | "work", locale: Locale): PostData[] {
  const postsDir = path.join(process.cwd(), "src", "content", kind, locale);
  return getMDXData(postsDir);
}

export function getSharedSlugs(kind: "blog" | "work"): string[] {
  const en = new Set(getLocalizedPosts(kind, "en").map((p) => p.slug));
  const ar = new Set(getLocalizedPosts(kind, "ar").map((p) => p.slug));
  return [...en].filter((slug) => ar.has(slug));
}
