import { getUserLocale } from "@/services/locale";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  const locale = await getUserLocale();

  const messages = (await import(`../../locales/${locale}/common.json`))
    .default;
  return {
    locale,
    messages,
  };
});
