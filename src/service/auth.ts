import {
  ForgotPasswordError,
  LoginError,
  RequestError,
  ResetPasswordError,
  SignUpError,
} from "@/lib/errors/request-error";
import request from "@/lib/request";
import { auth } from "@/validators";
import type {
  ForgotPasswordProps,
  LogInProps,
  SignUpProps,
} from "@/validators/auth";

async function signUp(props: Partial<SignUpProps>) {
  const preRequest = auth.signUp({ body: props });

  if (!preRequest.success) {
    throw new SignUpError({ details: preRequest.details });
  }

  const url = `/api/auth/signup`;
  const res = await request.post({ url, body: props });
  const { success, details, data } = res;

  if (!success) {
    throw new SignUpError({ details });
  }

  return data as { token: string; expiresIn: string };
}

async function logIn(props: LogInProps) {
  const preRequest = auth.logIn({ body: props });

  if (!preRequest.success) {
    throw new LoginError({ details: preRequest.details });
  }

  const url = "/api/auth/login";
  const res = await request.post({ url, body: props });
  const { success, details, data } = res;

  if (!success) {
    throw new LoginError({ details });
  }

  return data as { token: string; expiresIn: string };
}

async function logOut() {
  const url = "/api/auth/logout";
  const { success, details, data } = await request.get({ url });

  if (!success) {
    throw new RequestError({ details });
  }

  return data;
}

async function forgotPassword(props: ForgotPasswordProps) {
  const preRequest = auth.forgotPassword({ body: props });

  if (!preRequest.success) {
    throw new ForgotPasswordError({ details: preRequest.details });
  }

  const url = "/auth/forgot-password";
  const res = await request.post({ url, body: props, host: "api" });
  const { success, details, data } = res;

  if (!success) {
    throw new ForgotPasswordError({ details });
  }

  return data;
}

async function resetPassword(props: { password: string; token: string }) {
  const preRequest = auth.resetPassword({ body: props });

  if (!preRequest.success) {
    throw new ResetPasswordError({ details: preRequest.details });
  }

  const url = `/auth/reset-password`;
  const res = await request.post({ url, body: props, host: "api" });
  const { success, details, data } = res;

  if (!success) {
    throw new ResetPasswordError({ details });
  }

  return data;
}

export default { signUp, logIn, logOut, forgotPassword, resetPassword };
