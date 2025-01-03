"use client";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { getUserConfig } from "./action";
import { ProviderInfo, UserConfig } from "@prisma/client";
import { PreferenceSettings, ProviderSettings } from "@/components/settings";
import { userConfigApi } from "@/lib/api";
import providerApi from "@/lib/api/provider";

export default function SettingsPage() {
  const t = useTranslations("Settings");
  const [userConfig, setUserConfig] = useState<
    (UserConfig & { provider_settings: Record<string, any> }) | null
  >(null);

  const [providerList, setProviderList] = useState<ProviderInfo[]>([]);

  useEffect(() => {
    providerApi.list<ProviderInfo[]>().then((res) => {
      setProviderList(res);
    });
  }, []);

  useEffect(() => {
    getUserConfig().then((config) => {
      setUserConfig(config);
    });
  }, []);

  const handelSave = async (provider_settings: Record<string, any>) => {
    await userConfigApi.save({ provider_settings });
  };

  return (
    <div>
      {/* 页面标题 */}
      <div className="sticky top-0 px-10 py-5 backdrop-blur-sm">
        <h2 className="text-2xl font-bold tracking-tight">{t("settings")}</h2>
        <p className="text-muted-foreground">{t("customize_experience")}</p>
      </div>
      <Separator />
      {/* 设置选项 */}
      <div className="p-10 space-y-8">
        {/* 外观设置 */}
        <PreferenceSettings />

        <Separator />

        {/* 模型设置 */}
        {userConfig?.provider_settings && (
          <ProviderSettings
            providers={providerList}
            currentProvider={userConfig.provider_settings}
            onSave={handelSave}
          />
        )}
        <Separator />
      </div>
    </div>
  );
}
