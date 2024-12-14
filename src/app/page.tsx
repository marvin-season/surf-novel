import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Home() {
  // 检查登录状态
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true"
  
  // 根据登录状态重定向
  if (isLoggedIn) {
    redirect("/notes")
  } else {
    redirect("/login")
  }
}