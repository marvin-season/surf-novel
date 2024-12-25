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
      {/* {t('recent.notesList')} */}
      <AdvancedRichEditor
        content="逆风如解意"
        className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background  p-4"
      />
    </div>
  );
}
