"use client";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { getUserConfig } from "./action";
import { UserConfig } from "@prisma/client";
import { PreferenceSettings, ModelSettings } from "@/components/settings";
import { userConfigApi } from "@/lib/api";

export default function SettingsPage() {
  const t = useTranslations("Settings");
  const [userConfig, setUserConfig] = useState<
    (UserConfig & { settings: Record<string, any> }) | null
  >(null);

  useEffect(() => {
    getUserConfig().then((config) => {
      setUserConfig(config);
    });
  }, []);

  const handelSave = (settings: Record<string, any>) => {
    userConfigApi.save({ settings }).then((res) => {});
  };

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
        {userConfig?.settings && (
          <ModelSettings settings={userConfig.settings} onSave={handelSave} />
        )}
        <Separator />
      </div>
    </div>
  );
}
