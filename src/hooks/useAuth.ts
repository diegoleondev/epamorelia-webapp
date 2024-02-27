import { ROUTES } from "@/constants";
import {
  ForgotPasswordError,
  LoginError,
  ResetPasswordError,
  SignUpError,
} from "@/lib/errors/request-error";
import { auth } from "@/service";
import { useRouter, useSearchParams } from "next/navigation";

const saveSession = (data: { token: string; expiresIn: string }) => {
  localStorage.setItem("accessToken", data.token);
  localStorage.setItem("expiresIn", data.expiresIn);
};

const removeSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expiresIn");
};

export default function useAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function logOut() {
    return await auth
      .logOut()
      .then(() => {
        removeSession();
        router.replace(ROUTES.HOME);
        return {};
      })
      .catch((e) => {
        console.error(e);
        return { _: "ERROR" };
      });
  }

  async function logIn(form: { email: string; password: string }) {
    return await auth
      .logIn(form)
      .then((data) => {
        saveSession(data);

        const redirect = searchParams.get("redirect");
        router.replace(redirect ?? ROUTES.HOME);
        return {};
      })
      .catch((error) => {
        if (!(error instanceof LoginError)) {
          return { _: "ERROR" };
        }
        return error.details;
      });
  }

  async function signUp(form: {
    username?: string;
    email?: string;
    password?: string;
    invitation?: string;
  }) {
    return await auth
      .signUp(form)
      .then((data) => {
        saveSession(data);
        const redirect = searchParams.get("redirect");
        router.replace(redirect ?? ROUTES.HOME);
        return {};
      })
      .catch((error) => {
        if (!(error instanceof SignUpError)) {
          return { _: "ERROR" };
        }

        if (error.details.invitation === "INVALID") {
          router.replace(ROUTES.SIGN_UP_ERROR);
          return {};
        }

        return error.details;
      });
  }

  async function forgotPassword(form: { email: string }) {
    return await auth
      .forgotPassword(form)
      .then(() => {
        return {};
      })
      .catch((error) => {
        if (!(error instanceof ForgotPasswordError)) {
          return { _: "ERROR" };
        }
        return error.details;
      });
  }

  async function resetPassword(form: { token: string; password: string }) {
    return await auth
      .resetPassword(form)
      .then(() => {
        router.replace(ROUTES.HOME);
        return {};
      })
      .catch((error) => {
        if (!(error instanceof ResetPasswordError)) {
          return { _: "ERROR" };
        }
        return error.details;
      });
  }

  return {
    logIn,
    logOut,
    signUp,
    forgotPassword,
    resetPassword,
  };
}
