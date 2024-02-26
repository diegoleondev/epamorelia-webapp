import { z } from "zod";
import { schemaHandler } from "./validatorHandler";

const logInSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "REQUIRED",
        invalid_type_error: "TYPE",
      })
      .email("FORMAT"),
    password: z
      .string({
        required_error: "REQUIRED",
        invalid_type_error: "TYPE",
      })
      .min(6, "SHORT")
      .max(100, "LONG"),
  }),
});

export const logIn = schemaHandler(logInSchema);
export type LogInProps = z.infer<typeof logInSchema>["body"];

const signUpSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "REQUIRED",
        invalid_type_error: "TYPE",
      })
      .email("FORMAT"),
    password: z
      .string({
        required_error: "REQUIRED",
      })
      .min(6, "SHORT")
      .max(100, "LONG"),
    username: z
      .string({
        required_error: "REQUIRED",
        invalid_type_error: "TYPE",
      })
      .min(3, "SHORT")
      .max(25, "LONG"),
    invitation: z
      .string({
        required_error: "REQUIRED",
        invalid_type_error: "TYPE",
      })
      .uuid("FORMAT"),
  }),
});

type SignUpSchema = typeof signUpSchema;
export type SignUpProps = z.infer<SignUpSchema>["body"];
export const signUp = schemaHandler(signUpSchema);

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "EMPTY",
        invalid_type_error: "TYPE",
      })
      .email("FORMAT"),
  }),
});
export const forgotPassword = schemaHandler(forgotPasswordSchema);
export type ForgotPasswordProps = z.infer<typeof forgotPasswordSchema>["body"];

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: "EMPTY",
      invalid_type_error: "TYPE",
    }),
    password: z
      .string({
        required_error: "EMPTY",
        invalid_type_error: "TYPE",
      })
      .min(6, "SHORT")
      .max(100, "LONG"),
  }),
});
export const resetPassword = schemaHandler(resetPasswordSchema);
export type ResetPasswordProps = z.infer<typeof resetPasswordSchema>["body"];

export default {
  logIn,
  signUp,
  forgotPassword,
  resetPassword,
};
