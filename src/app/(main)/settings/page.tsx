"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Moon, Save, Smartphone, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from '@/lib/ThemeContext';
import { useTranslations } from "next-intl"

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Settings')
  const locale = 'en' // default locale
  const handleLocaleChange = (e) => {
    // add logic to handle locale change
  }

  return (
    <div className="space-y-8 p-10">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('settings')}</h2>
        <p className="text-muted-foreground">
          {t('customize_experience')}
        </p>
      </div>

      <Separator />

      {/* 设置选项 */}
      <div className="space-y-10">
        {/* 外观设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t('appearance')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('customize_appearance')}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Moon className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">{t('dark_mode')}</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t('comfortable_coloring')}
                  </p>
                </div>
              </div>
              <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Smartphone className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label>{t('theme_mode')}</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t('choose_theme_mode')}
                  </p>
                </div>
              </div>
              <Select defaultValue="system">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('theme_mode_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('light')}</SelectItem>
                  <SelectItem value="dark">{t('dark')}</SelectItem>
                  <SelectItem value="system">{t('follow_system')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Label>{t('language')}</Label>
              </div>
              <Select value={locale} onValueChange={handleLocaleChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('language_placeholder')} />
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

        {/* 通知设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t('notifications')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('configure_notifications')}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">{t('notification_reminders')}</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t('receive_updates')}
                  </p>
                </div>
              </div>
              <Switch id="notifications" />
            </div>
          </div>
        </div>

        <Separator />

        {/* 性能设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t('performance')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('optimize_performance')}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Zap className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">{t('auto_save')}</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t('auto_save_changes')}
                  </p>
                </div>
              </div>
              <Switch id="auto-save" defaultChecked />
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <Button size="lg" className="gap-2 min-w-[120px]">
            <Save className="h-4 w-4" />
            {t('save_settings')}
          </Button>
        </div>
      </div>
    </div>
  )
}
