import { getLocalizedPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { prefixLocalePath } from "@/i18n/config";
import { getPageStrings } from "@/i18n/pageStrings";
import type { Locale } from "@/i18n/config";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  locale: Locale;
}

export function Projects({ range, exclude, locale }: ProjectsProps) {
  let allProjects = getLocalizedPosts("work", locale);
  const t = getPageStrings(locale);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={prefixLocalePath(locale, `/work/${post.slug}`)}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          readCaseStudyLabel={t.readCaseStudy}
          viewProjectLabel={t.viewProject}
        />
      ))}
    </Column>
  );
}
