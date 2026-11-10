"use client";

import { Row, Text, Button, useToast } from "@once-ui-system/core";
import { socialSharing } from "@/resources";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getPageStrings } from "@/i18n/pageStrings";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter",
    label: "X",
    generateUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (_title, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (_title, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    generateUrl: (title, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, url) =>
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: () => "",
  },
};

function useShareLocale(): Locale {
  const params = useParams();
  const raw = params?.locale;
  if (typeof raw === "string" && isLocale(raw)) return raw;
  return defaultLocale;
}

export function ShareSection({ title, url }: ShareSectionProps) {
  const { addToast } = useToast();
  const locale = useShareLocale();
  const t = getPageStrings(locale);

  if (!socialSharing.display) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        variant: "success",
        message: t.linkCopied,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      addToast({
        variant: "danger",
        message: t.linkCopyFailed,
      });
    }
  };

  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([_, enabled]) => enabled && _ !== "copyLink")
    .map(([platformKey]) => ({ key: platformKey, ...socialPlatforms[platformKey] }))
    .filter((platform) => platform.name);

  return (
    <Row fillWidth center gap="16" marginTop="32" marginBottom="16">
      <Text variant="label-default-m" onBackground="neutral-weak">
        {t.shareThisPost}
      </Text>
      <Row data-border="rounded" gap="16" horizontal="center" wrap>
        {enabledPlatforms.map((platform, index) => (
          <Button
            key={index}
            variant="secondary"
            size="s"
            href={
              platform.name === "email"
                ? `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${t.emailShareBody} ${url}`)}`
                : platform.generateUrl(title, url)
            }
            prefixIcon={platform.icon}
          />
        ))}

        {socialSharing.platforms.copyLink && (
          <Button variant="secondary" size="s" onClick={handleCopy} prefixIcon="openLink" />
        )}
      </Row>
    </Row>
  );
}
