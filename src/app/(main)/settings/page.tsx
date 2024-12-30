"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Languages, Moon, Save, Smartphone, Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/theme-context";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/i18n/config";
import { useState, useEffect, useMemo } from "react";
import { getUserConfig } from "./action";
import { LLMApiResponse } from "@/types/llm";
import { UserConfig } from "@prisma/client";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("Settings");

  const locale = useLocale();
  const handleLocaleChange = (value: Locale) => {
    setUserLocale(value);
  };

  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

  const [modelProviderList, setModelProviderList] = useState<
    LLMApiResponse["providers"]
  >([]);

  // 已选择模型提供商
  const [modelProviderId, setModelProviderId] = useState<string>("");
  // 已选择模型
  const [modelId, setModelId] = useState<string>("");

  useEffect(() => {
    getUserConfig().then((config) => {
      setUserConfig(config);
    });
  }, []);

  const models = useMemo(() => {
    return (
      modelProviderList.find((provider) => provider.id === modelProviderId)
        ?.lLMModel || []
    );
  }, [modelProviderList, modelProviderId]);

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
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t("appearance")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("customize_appearance")}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Moon className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">{t("dark_mode")}</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t("comfortable_coloring")}
                  </p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Languages className="h-5 w-5" />
                <Label>{t("language")}</Label>
              </div>
              <Select value={locale} onValueChange={handleLocaleChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("language_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* 模型设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{"模型设置"}</h3>
            <p className="text-sm text-muted-foreground">
              {"选择模型提供商，配置模型"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* 模型提供商 */}
            <Select value={modelProviderId} onValueChange={setModelProviderId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={"选择模型提供商"} />
              </SelectTrigger>
              <SelectContent>
                {modelProviderList.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* 模型选择 */}
            <Select value={modelId} onValueChange={setModelId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={"选择模型"} />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* 性能设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t("performance")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("optimize_performance")}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Zap className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">{t("auto_save")}</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t("auto_save_changes")}
                  </p>
                </div>
              </div>
              <Switch id="auto-save" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
