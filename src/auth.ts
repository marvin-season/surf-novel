import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { loginOrRegist } from "@/lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      authorize: async (credentials) => {
        return loginOrRegist(
          credentials as {
            email: string;
            password: string;
          },
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // 将用户 ID 添加到 JWT
        token.email = user.email; // 将用户邮箱添加到 JWT
      }
      return token; // 返回更新后的 JWT
    },
    async session({ session, token }) {
      session.user.id = token.id as string; // 将 JWT 中的用户 ID 添加到会话
      session.user.email = token.email as string; // 将 JWT 中的用户邮箱添加到会话
      return session; // 返回更新后的会话对象
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      // 公开路由
      const publicRoutes = ["/", "/login"];
      if (publicRoutes.includes(pathname)) {
        return true; // 允许访问
      }

      // 如果用户未登录，重定向到登录页面
      if (!auth) {
        if (pathname.startsWith("/api")) {
          return NextResponse.json(
            {
              message: "UnAuth",
            },
            { status: 401 },
          );
        }
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // 允许访问受保护路由
      return true;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
