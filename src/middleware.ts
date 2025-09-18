import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function newId() {
  // 低依賴：用 crypto 隨機字串
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const hasGuest = req.cookies.get("guestId");
  if (!hasGuest) {
    const id = newId();
    res.cookies.set("guestId", id, {
      httpOnly: true, // 伺服端可讀，避免被前端腳本竄改
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 2, // 2 年
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)"],
};
