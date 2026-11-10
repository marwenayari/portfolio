import type { Locale } from "./config";

const strings = {
  en: {
    latestFromBlog: "Latest from the blog",
    earlierPosts: "Earlier posts",
    breadcrumbBlog: "Blog",
    recentPosts: "Recent posts",
    breadcrumbProjects: "Projects",
    scheduleCall: "Schedule a call",
    shareThisPost: "Share this post:",
    linkCopied: "Link copied to clipboard",
    linkCopyFailed: "Failed to copy link",
    emailShareBody: "Check out this post:",
    notFound404: "404",
    pageNotFound: "Page Not Found",
    pageNotFoundDesc: "The page you are looking for does not exist.",
    passwordProtected: "This page is password protected",
    passwordLabel: "Password",
    submit: "Submit",
    incorrectPassword: "Incorrect password",
    invalidEmail: "Please enter a valid email address.",
    subscribe: "Subscribe",
    emailPlaceholder: "Email",
    readCaseStudy: "Read case study",
    viewProject: "View project",
  },
  ar: {
    latestFromBlog: "أحدث المقالات من المدونة",
    earlierPosts: "مقالات أقدم",
    breadcrumbBlog: "المدونة",
    recentPosts: "مقالات حديثة",
    breadcrumbProjects: "المشاريع",
    scheduleCall: "حدد موعداً لمكالمة",
    shareThisPost: "شارك هذا المقال:",
    linkCopied: "تم نسخ الرابط",
    linkCopyFailed: "تعذر نسخ الرابط",
    emailShareBody: "اطلع على هذا المقال:",
    notFound404: "٤٠٤",
    pageNotFound: "الصفحة غير موجودة",
    pageNotFoundDesc: "الصفحة التي تبحث عنها غير موجودة.",
    passwordProtected: "هذه الصفحة محمية بكلمة مرور",
    passwordLabel: "كلمة المرور",
    submit: "إرسال",
    incorrectPassword: "كلمة مرور غير صحيحة",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح.",
    subscribe: "اشترك",
    emailPlaceholder: "البريد الإلكتروني",
    readCaseStudy: "اقرأ دراسة الحالة",
    viewProject: "عرض المشروع",
  },
} as const;

export type PageStrings = (typeof strings)[Locale];

export function getPageStrings(locale: Locale): PageStrings {
  return strings[locale];
}
