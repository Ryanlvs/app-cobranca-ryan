import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export default async function middleware(request: NextRequest) {
  // console.log("AUTH", auth());
  // console.log("REQUEST", request);

  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

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
