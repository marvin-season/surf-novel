export type Locale = (typeof locales)[number];

export const locales = ["zh", "en", "ja"] as const;
export const defaultLocale: Locale = "zh";