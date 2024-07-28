import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";
import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies
    .getAll()
    .find((cookie) => cookie.name.includes("authjs.session-token"));

  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL(getUrl("/app")));
  }
  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth")));
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
