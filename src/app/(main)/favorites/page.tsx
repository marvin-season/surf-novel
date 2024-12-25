"use client";

import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/fetch";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export default function FavoritesPage() {
  const t = useTranslations("favorites");
  const divRef = useRef(null);

  useEffect(() => {
    console.log(divRef)
  }, [divRef])
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      </div>
      <Button onClick={() => {
        fetchApi('/generate', {
          method: 'POST',
          body: JSON.stringify({
            prompt: 'hi',
          }),
        })
      }}>Generate</Button>
    </div>
  );
}
