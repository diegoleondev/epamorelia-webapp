import request from "@/lib/request";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("accessToken")?.value;

  const apiResponse = await request.post({
    body: { token },
    url: "/auth/logout",
    host: "api",
  });

  const nextResponse = NextResponse.json(apiResponse);
  nextResponse.cookies.delete("accessToken");

  return nextResponse;
}
