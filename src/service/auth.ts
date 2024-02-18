import {
  LoginError,
  RequestError,
  SignUpError,
} from "@/lib/errors/request-error";
import request from "@/lib/request";
import { auth } from "@/validators";
import type { LogInProps, SignUpProps } from "@/validators/auth";

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

  return data;
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

  return data;
}

async function logOut() {
  const url = "/api/auth/logout";
  const { success, details, data } = await request.get({ url });

  if (!success) {
    throw new RequestError({ details });
  }

  return data;
}

export default { signUp, logIn, logOut };
