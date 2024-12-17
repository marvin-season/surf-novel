"use server";

import { cookies } from "next/headers";

export const getStore = async (key: string) => {
  //   return localStorage.getItem(key);
  return (await cookies()).get(key)?.value;
};

export const setStore = async (key: string, value: string) => {
  //   localStorage.setItem(key, value);
  (await cookies()).set(key, value);
};

export const removeStore = async (key: string) => {
  //   localStorage.removeItem(key);
  (await cookies()).delete(key);
};
