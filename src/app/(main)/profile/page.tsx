"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8 p-10">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">个人信息</h2>
        <p className="text-muted-foreground">
          管理您的个人信息和偏好设置
        </p>
      </div>

      <Separator />

      {/* 个人信息表单 */}
      <div className="space-y-8">
        {/* 头像部分 */}
        <div className="flex items-start gap-10">
          <div>
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">AD</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">头像</h3>
              <p className="text-sm text-muted-foreground">
                支持 JPG、PNG 格式，文件大小不超过 2MB
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="h-4 w-4" />
              更换头像
            </Button>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">基本信息</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="username" 
                      value="admin" 
                      readOnly 
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="请输入邮箱" 
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 个性化设置 */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">个性化</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">昵称</Label>
                  <Input id="nickname" placeholder="请输入昵称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Input id="bio" placeholder="介绍一下自己吧" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <Button size="lg" className="min-w-[120px]">
            保存更改
          </Button>
        </div>
      </div>
    </div>
  )
}
