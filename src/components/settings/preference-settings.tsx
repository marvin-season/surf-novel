import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Languages, Moon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/theme-context";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
export default function PreferenceSettings() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("Settings");
  const locale = useLocale();
  const handleLocaleChange = (value: Locale) => {
    setUserLocale(value);
  };
  return (
    <>
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
    </>
  );
}
