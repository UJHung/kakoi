import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasGuest = req.cookies.get("guestId");
  
  // 首頁重導向邏輯
  if (req.nextUrl.pathname === "/" && hasGuest) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 沒有 guestId 時重導向到首頁
  if (!hasGuest) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 已有 cookie 時直接通過，避免不必要的 NextResponse.next()
  return NextResponse.next();
}

export const config = {
  // 縮小 matcher 範圍，只處理需要的路由
  matcher: ["/", "/dashboard/:path*", "/cards/:path*", "/offers/:path*"],
};
