import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default function () {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">登录</h1>
        <p className="text-sm text-muted-foreground">输入您的账户信息以继续</p>
      </div>

      <form
        action={async (formData) => {
          "use server";
          const form = Object.fromEntries(formData);
          await signIn("credentials", { ...form, redirectTo: "/notes" });
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="请输入邮箱"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={false}>
          {/*{isLoading ? "登录中..." : "登录"}*/}
        </Button>
      </form>

      <div className="text-sm text-center">
        <span className="text-muted-foreground">
          如果您没有帐号，系统会自动为您注册一个新帐号
        </span>{" "}
      </div>
    </>
  );
}
