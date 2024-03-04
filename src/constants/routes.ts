const ROUTES = {
  HOME: "/",
  SIGN_UP: "/auth/signup",
  SIGN_UP_ERROR: "/auth/signup/error",
  LOG_IN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",

  BRANCH: "/dashboard/branch",
  USER: "/dashboard/user",

  PROFILE: "/profile",
} as const;

export default ROUTES;
