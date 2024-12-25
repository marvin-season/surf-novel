"use client";

import { AdvancedRichEditor } from "@/components/advanced-rich-editor";
import { useTranslations } from "next-intl";

export default function RecentPage() {
  const t = useTranslations("recent");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        {/* {t('recent.notesList')} */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* {t('recent.notesList')} */}
        <AdvancedRichEditor className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg p-4" />
      </div>
    </div>
  );
}
