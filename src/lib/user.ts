"use server";

import { auth } from "@/auth";

export const getLoggedUserInfo = async () => {
  const session = await auth();
  return session!.user as {
    email: string;
    id: string;
  };
};
