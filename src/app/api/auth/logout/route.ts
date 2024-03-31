import requestSSR from "@/utils/request-srr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("accessToken")?.value;

  const response = await requestSSR({
    body: { token },
    url: "/auth/logout",
    host: "api",
    method: "POST",
  });

  const nextResponse = NextResponse.json(response);
  nextResponse.cookies.delete("accessToken");

  return nextResponse;
}
