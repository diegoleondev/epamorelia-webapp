import requestCSR from "@/utils/request-csr";
import {
  forgotPasswordValidator,
  logInValidator,
  resetPasswordValidator,
  signUpValidator,
  type ForgotPasswordProps,
  type LogInProps,
  type ResetPasswordProps,
  type SignUpProps,
} from "@/validators/auth";

export async function signUpApi(body: Partial<SignUpProps>) {
  const preRequest = signUpValidator(body);
  if (!preRequest.success) return preRequest;

  return await requestCSR<User>({
    url: "/api/auth/signup",
    host: "next",
    body,
    method: "POST",
  });
}

export async function logInApi(body: LogInProps) {
  const preRequest = logInValidator(body);
  if (!preRequest.success) return preRequest;

  return await requestCSR<User>({
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
  const preRequest = forgotPasswordValidator({ body });
  if (!preRequest.success) return preRequest;

  return await requestCSR({
    url: "/auth/forgot-password",
    body,
    host: "api",
    method: "POST",
  });
}

export async function resetPasswordApi(body: ResetPasswordProps) {
  const preRequest = resetPasswordValidator({ body });
  if (!preRequest.success) return preRequest;

  return await requestCSR({
    url: "/auth/reset-password",
    body,
    host: "api",
    method: "POST",
  });
}
