"use server";

import { signIn, signOut } from "@/auth";

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};

export const loginOrRegistAction = async (form: {}) => {
  return signIn("credentials", { ...form, redirectTo: "/" });
};
