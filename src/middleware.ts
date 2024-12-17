import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStore } from "./lib/store";

const publicPages = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = getStore("token");

  // Check if the pathname starts with /api
  if (pathname.startsWith("/api")) {
    if (!token && !publicPages.some((page) => pathname.includes(page))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token && !publicPages.some((page) => pathname.includes(page))) {
    const loginUrl = new URL(`/login`, request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
