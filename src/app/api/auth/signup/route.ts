import requestSSR from "@/utils/request-srr";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Data {
  token: string;
  expiresIn: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await requestSSR<Data>({
    body,
    url: "/auth/signup",
    host: "api",
    method: "POST",
  });

  if (response?.success) {
    const { token, expiresIn } = response.data;

    cookies().set("accessToken", token, {
      httpOnly: true,
      maxAge: Math.floor(expiresIn / 1000),
    });
  }

  return NextResponse.json(response);
}
