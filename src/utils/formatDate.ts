import type { Locale } from "@/i18n/config";

const relativeLabels: Record<
  Locale,
  { today: string; dayAgo: (n: number) => string; monthAgo: (n: number) => string; yearAgo: (n: number) => string }
> = {
  en: {
    today: "Today",
    dayAgo: (n) => `${n}d ago`,
    monthAgo: (n) => `${n}mo ago`,
    yearAgo: (n) => `${n}y ago`,
  },
  ar: {
    today: "اليوم",
    dayAgo: (n) => `منذ ${n} يوماً`,
    monthAgo: (n) => `منذ ${n} شهراً`,
    yearAgo: (n) => `منذ ${n} سنة`,
  },
};

export function formatDate(date: string, locale: Locale, includeRelative = false) {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();
  const labels = relativeLabels[locale];

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = labels.yearAgo(yearsAgo);
  } else if (monthsAgo > 0) {
    formattedDate = labels.monthAgo(monthsAgo);
  } else if (daysAgo > 0) {
    formattedDate = labels.dayAgo(daysAgo);
  } else {
    formattedDate = labels.today;
  }

  const intlLocale = locale === "ar" ? "ar-TN" : "en-US";
  const fullDate = targetDate.toLocaleString(intlLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
