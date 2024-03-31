import {
  forgotPasswordApi,
  logInApi,
  logOutApi,
  resetPasswordApi,
  signUpApi,
} from "@/api/auth";
import { MESSAGES, ROUTES } from "@/constants";
import useUserContext from "@/contexts/user";
import { detailsToMessage } from "@/utils/details-to-message";

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
  const user = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = (url: string) => {
    const currentUrl = window.location.href;

    const interval = setInterval(() => {
      if (window.location.href !== currentUrl) {
        clearInterval(interval);
        return;
      }

      router.replace(url);
    }, 250);
  };

  const toMessage = (details: any) =>
    detailsToMessage({
      details,
      dictionary: MESSAGES.AUTH,
    });

  const logOut = async () => {
    const { details, success } = await logOutApi();

    if (!success) return toMessage(details);

    removeSession();
    user.clearData();
    redirect(ROUTES.LOG_IN);
  };

  const logIn = async (form: { email: string; password: string }) => {
    const { success, data, details } = await logInApi(form);

    if (!success || data === null) return toMessage(details);

    saveSession({
      token: data.token,
      expiresIn: String(data.expiresIn),
    });

    const to = searchParams.get("redirect");
    user.setData(data);
    redirect(to ?? ROUTES.HOME);

    return {};
  };

  const signUp = async (form: {
    username?: string;
    email?: string;
    password?: string;
    invitation?: string;
  }) => {
    const { success, data, details } = await signUpApi(form);

    if (!success || data === null) return toMessage(details);

    saveSession({
      token: data.token,
      expiresIn: String(data.expiresIn),
    });

    user.setData(data);
    redirect(ROUTES.HOME);

    return {};
  };

  const forgotPassword = async (form: { email: string }) => {
    const response = await forgotPasswordApi(form);
    return toMessage(response.details);
  };

  const resetPassword = async (form: { token: string; password: string }) => {
    const response = await resetPasswordApi(form);

    if (response.success) {
      redirect(ROUTES.LOG_IN);
    }

    return toMessage(response.details);
  };

  return {
    user,
    logIn,
    logOut,
    signUp,
    forgotPassword,
    resetPassword,
  };
}
