"use client";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { getUserConfig } from "./action";
import { UserConfig } from "@prisma/client";
import { PreferenceSettings, ModelSettings } from "@/components/settings";

export default function SettingsPage() {
  const t = useTranslations("Settings");
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

  useEffect(() => {
    getUserConfig().then((config) => {
      setUserConfig(config);
    });
  }, []);

  const modelSettings = useMemo(() => {
    console.log("userConfig?.settings", userConfig?.settings);
    return userConfig?.settings || {};
  }, [userConfig]);

  return (
    <div className="space-y-8 p-10">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("settings")}</h2>
        <p className="text-muted-foreground">{t("customize_experience")}</p>
      </div>

      <Separator />

      {/* 设置选项 */}
      <div className="space-y-10">
        {/* 外观设置 */}
        <PreferenceSettings />

        <Separator />

        {/* 模型设置 */}
        <ModelSettings settings={modelSettings} />

        <Separator />
      </div>
    </div>
  );
}
