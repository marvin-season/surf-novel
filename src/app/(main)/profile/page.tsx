"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, User } from "lucide-react"
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('Profile');

  return (
    <div className="space-y-8 p-10">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('profileInfo')}</h2>
        <p className="text-muted-foreground">
          {t('manageInfo')}
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
              <h3 className="text-lg font-medium">{t('avatar')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('avatarInfo')}
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="h-4 w-4" />
              {t('changeAvatar')}
            </Button>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">{t('basicInfo')}</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('username')}</Label>
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
                  <Label htmlFor="email">{t('email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={t('enterEmail')} 
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
              <h3 className="text-lg font-medium mb-4">{t('personalized')}</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">{t('nickname')}</Label>
                  <Input id="nickname" placeholder={t('enterNickname')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t('bio')}</Label>
                  <Input id="bio" placeholder={t('enterBio')} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <Button size="lg" className="min-w-[120px]">
            {t('save_changes')}
          </Button>
        </div>
      </div>
    </div>
  )
}
