import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies
    .getAll()
    .find((cookie) => cookie.name.includes("authjs.session-token"));

  if ((pathname === "/auth" || pathname === "/") && token) {
    console.log("redirect to /app");
    return NextResponse.redirect(new URL(getUrl("/app")));
  }
  if ((pathname.includes("/app") || pathname === "/") && !token) {
    console.log("redirect to /auth");
    return NextResponse.redirect(new URL(getUrl("/auth")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
