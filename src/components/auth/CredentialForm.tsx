import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function () {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">登录</h1>
        <p className="text-sm text-muted-foreground">输入您的账户信息以继续</p>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{"error"}</AlertDescription>
      </Alert>

      <form onSubmit={() => {}} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            placeholder="请输入邮箱"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            // disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            placeholder="请输入密码"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            // disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={false}>
          {/*{isLoading ? "登录中..." : "登录"}*/}
        </Button>
      </form>

      <div className="text-sm text-center">
        <span className="text-muted-foreground">还没有账号？</span>{" "}
        <Link href="/register" className="text-primary hover:underline">
          立即注册
        </Link>
      </div>
    </>
  );
}
