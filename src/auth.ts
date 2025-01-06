import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          // 验证密码
          const isValid = await compare(password, user.password);
          if (isValid) {
            return { id: user.id, email: user.email };
          }
        } else {
          // 注册新用户
          const hashedPassword = await hash(password, 12);
          const newUser = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
          return { id: newUser.id, email: newUser.email };
        }
      },
    }),
  ],
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id; // 将用户 ID 添加到 JWT
      token.email = user.email; // 将用户邮箱添加到 JWT
    }
    return token; // 返回更新后的 JWT
  },
  async session({ session, token }) {
    session.user.id = token.id; // 将 JWT 中的用户 ID 添加到会话
    session.user.email = token.email; // 将 JWT 中的用户邮箱添加到会话
    return session; // 返回更新后的会话对象
  },
  secret: process.env.NEXT_AUTH_SECRET,
});