import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasGuest = req.cookies.get("guestId");
  const pathname = req.nextUrl.pathname;
  
  // 首頁重導向邏輯
  if (pathname === "/") {
    if (hasGuest) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 對於需要認證的頁面，沒有 guestId 時重導向到首頁
  if (!hasGuest && (pathname.startsWith("/dashboard") || 
                   pathname.startsWith("/cards") || 
                   pathname.startsWith("/offers"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // 縮小 matcher 範圍，只處理需要的路由
  matcher: ["/", "/dashboard/:path*", "/cards/:path*", "/offers/:path*"],
};
