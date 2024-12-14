"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Moon, Save, Smartphone, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-8 p-10">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">设置</h2>
        <p className="text-muted-foreground">
          自定义您的应用程序体验
        </p>
      </div>

      <Separator />

      {/* 设置选项 */}
      <div className="space-y-10">
        {/* 外观设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">外观</h3>
            <p className="text-sm text-muted-foreground">
              自定义应用程序的外观和主题
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Moon className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">深色模式</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    在深色环境下使用更舒适的配色
                  </p>
                </div>
              </div>
              <Switch id="dark-mode" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Smartphone className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label>主题模式</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    选择您喜欢的主题模式
                  </p>
                </div>
              </div>
              <Select defaultValue="system">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择主题模式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">浅色</SelectItem>
                  <SelectItem value="dark">深色</SelectItem>
                  <SelectItem value="system">跟随系统</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* 通知设置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">通知</h3>
            <p className="text-sm text-muted-foreground">
              配置应用程序的通知方式
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">通知提醒</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    接收重要更新和提醒
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
            <h3 className="text-lg font-medium">性能</h3>
            <p className="text-sm text-muted-foreground">
              优化应用程序的性能和体验
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <Zap className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">自动保存</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    自动保存您的更改
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
            保存设置
          </Button>
        </div>
      </div>
    </div>
  )
}
