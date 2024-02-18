import request from "@/lib/request";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await request.post({
    body,
    url: "/auth/login",
    host: "api",
  });

  if (response?.success) {
    const { token, expiresIn } = response.data;

    cookies().set("accessToken", token as string, {
      httpOnly: true,
      maxAge: Math.floor(expiresIn / 1000),
    });

    response.data.token = undefined;
    return NextResponse.json(response);
  }

  return NextResponse.json(response);
}
