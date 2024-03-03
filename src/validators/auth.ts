import { DETAILS } from "@/constants";
import { z } from "zod";
import { schemaHandler } from "./validatorHandler";

// SCHEMAS
const emailSchema = z
  .string({
    required_error: DETAILS.REQUIRED,
    invalid_type_error: DETAILS.TYPE,
  })
  .email(DETAILS.FORMAT);

const passwordSchema = z
  .string({
    required_error: DETAILS.REQUIRED,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(6, DETAILS.SHORT)
  .max(100, DETAILS.LONG);

const usernameSchema = z
  .string({
    required_error: DETAILS.REQUIRED,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(3, DETAILS.SHORT)
  .max(25, DETAILS.LONG);

const invitationSchema = z
  .string({
    required_error: DETAILS.REQUIRED,
    invalid_type_error: DETAILS.TYPE,
  })
  .uuid("FORMAT");

const tokenSchema = z.string({
  required_error: DETAILS.REQUIRED,
  invalid_type_error: DETAILS.TYPE,
});

const logInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// VALIDATORS
export const logInValidator = schemaHandler(logInSchema);
export type LogInProps = z.infer<typeof logInSchema>;

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  invitation: invitationSchema,
});
export type SignUpProps = z.infer<typeof signUpSchema>;
export const signUpValidator = schemaHandler(signUpSchema);

const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordProps = z.infer<typeof forgotPasswordSchema>;
export const forgotPasswordValidator = schemaHandler(forgotPasswordSchema);

export const resetPasswordSchema = z.object({
  token: tokenSchema,
  password: passwordSchema,
});
export type ResetPasswordProps = z.infer<typeof resetPasswordSchema>;
export const resetPasswordValidator = schemaHandler(resetPasswordSchema);
