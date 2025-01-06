"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

export const getLoggedUserInfo = async () => {
  const session = await auth();
  return session!.user as {
    email: string;
    id: string;
  };
};

export const loginOrRegist = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    // 验证密码
    const isValid = await compare(password, user.password);
    console.log("user isValid", user, isValid);

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
};
