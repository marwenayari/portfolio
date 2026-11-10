import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Satisfies typed routes for `/gallery`; middleware also redirects to the default locale. */
export default function GalleryRedirect() {
  redirect(`/${defaultLocale}/gallery`);
}
