"use server";

import { getStore } from "@/lib/store";

export const getLoggedUserInfo = async () => {
  const user = JSON.parse((await getStore("user")) || "{}");
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return user;
};
