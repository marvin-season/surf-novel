import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname

  // 需要保护的路由
  const isProtectedRoute = path.startsWith("/notes") || 
    path.startsWith("/recent") || 
    path.startsWith("/favorites") ||
    path.startsWith("/api/notes")

  // 如果是API路由但不是认证相关的路由
  const isProtectedApi = path.startsWith("/api/") && !path.startsWith("/api/auth/")

  if (isProtectedRoute || isProtectedApi) {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Authentication required" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    try {
      // 验证JWT token
      const decoded = verify(token, JWT_SECRET)
      // 将用户信息添加到请求头中
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", (decoded as any).userId)
      
      // 继续处理请求
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  }

  // 如果已登录但访问登录页，重定向到主页
  if (request.cookies.get("token") && path === "/login") {
    return NextResponse.redirect(new URL("/notes", request.url))
  }

  return NextResponse.next()
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: [
    "/notes/:path*", 
    "/recent/:path*", 
    "/favorites/:path*", 
    "/login",
    "/api/:path*"
  ],
}
