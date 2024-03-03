import requestCSR from "@/utils/request-csr";
import { auth } from "@/validators";
import type {
  ForgotPasswordProps,
  LogInProps,
  SignUpProps,
} from "@/validators/auth";

interface Data {
  branchId: string;
  createdAt: string;
  email: string;
  expiresIn: number;
  id: string;
  roleId: string;
  username: string;
  verified: boolean;
  token: string;
}

export async function signUpApi(body: Partial<SignUpProps>) {
  const preRequest = auth.signUp({ body });
  if (!preRequest.success) return preRequest;

  return await requestCSR<Data>({
    url: "/api/auth/signup",
    host: "next",
    body,
    method: "POST",
  });
}

export async function logInApi(body: LogInProps) {
  const preRequest = auth.logIn({ body });
  if (!preRequest.success) return preRequest;

  return await requestCSR<Data>({
    url: "/api/auth/login",
    host: "next",
    body,
    method: "POST",
  });
}

export async function logOutApi() {
  return await requestCSR({
    url: "/api/auth/logout",
    host: "next",
    method: "GET",
  });
}

export async function forgotPasswordApi(body: ForgotPasswordProps) {
  const preRequest = auth.forgotPassword({ body });
  if (!preRequest.success) return preRequest;

  return await requestCSR({
    url: "/auth/forgot-password",
    body,
    host: "api",
    method: "POST",
  });
}

export async function resetPasswordApi(body: {
  password: string;
  token: string;
}) {
  const preRequest = auth.resetPassword({ body });
  if (!preRequest.success) return preRequest;

  return await requestCSR({
    url: "/auth/reset-password",
    body,
    host: "api",
    method: "POST",
  });
}
