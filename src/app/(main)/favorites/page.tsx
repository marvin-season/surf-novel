"use client"

import { ContentEditor } from '@/components/novel';
import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('favorites');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* {t('common.favorites.notesList')} */}

        <ContentEditor />
      </div>
    </div>
  );
}
