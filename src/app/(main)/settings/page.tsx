"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>设置</CardTitle>
          <CardDescription>
            管理您的应用程序设置
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="dark-mode">深色模式</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="notifications">通知提醒</Label>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-save">自动保存</Label>
            <Switch id="auto-save" defaultChecked />
          </div>
          <Button>保存设置</Button>
        </CardContent>
      </Card>
    </div>
  )
}
