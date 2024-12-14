import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname

  // 判断是否已登录
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true"

  // 需要保护的路由
  const isProtectedRoute = path.startsWith("/notes") || 
    path.startsWith("/recent") || 
    path.startsWith("/favorites")

  // 如果访问受保护的路由但未登录，重定向到登录页
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 如果已登录但访问登录页，重定向到主页
  if (isLoggedIn && path === "/login") {
    return NextResponse.redirect(new URL("/notes", request.url))
  }

  return NextResponse.next()
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: ["/notes/:path*", "/recent/:path*", "/favorites/:path*", "/login"],
}
