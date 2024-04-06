import { ROUTES } from "@/constants";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAuthApi } from "./api/auth";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const token = cookies().get("accessToken")?.value;
  const hasSession = await verifyAuthApi(token ?? "");

  const isFormRoute = url.pathname.startsWith("/form");
  const isAuthRoute = url.pathname.startsWith("/auth");

  if (isFormRoute) {
    return NextResponse.next();
  }

  if (hasSession && isAuthRoute) {
    url.pathname = ROUTES.HOME;
    return NextResponse.redirect(url.toString());
  }

  if (!hasSession && !isAuthRoute) {
    url.searchParams.set("redirect", url.pathname);
    url.pathname = ROUTES.LOG_IN;
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest).*)",
    "/maskable_icon(_xd{2,3})?.png",
  ],
};
