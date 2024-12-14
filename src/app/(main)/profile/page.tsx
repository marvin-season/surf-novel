"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>个人信息</CardTitle>
          <CardDescription>
            查看和更新您的个人信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input id="username" value="admin" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="请输入邮箱" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">昵称</Label>
            <Input id="nickname" placeholder="请输入昵称" />
          </div>
          <Button>保存更改</Button>
        </CardContent>
      </Card>
    </div>
  )
}
