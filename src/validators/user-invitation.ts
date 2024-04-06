import { DETAILS } from "@/constants";
import { schemaHandler } from "@/validators/validatorHandler";
import { z } from "zod";
import { branchIdSchema } from "./branch";

const idSchema = z
  .string({
    required_error: DETAILS.FORMAT,
    invalid_type_error: DETAILS.FORMAT,
  })
  .uuid(DETAILS.FORMAT);

const rolIdSchema = z.enum(["ADMIN", "COORDINATOR", "STAFF", "USER"]);

const getSchema = z.object({
  id: idSchema,
});

export const findOneUserInvitationValidator = schemaHandler(getSchema);
export type FindUserInvitationProps = z.infer<typeof getSchema>;

const findAllSchema = z.object({
  branchId: branchIdSchema,
});
export const findAllUserInvitationsValidator = schemaHandler(findAllSchema);
export type FindAllUserInvitationsProps = z.infer<typeof findAllSchema>;

const createSchema = z.object({
  branchId: branchIdSchema,
  roleId: rolIdSchema,
  reference: z.string().optional(),
});
export const createInvitationValidator = schemaHandler(createSchema);
export type CreateUserInvitationProps = z.infer<typeof createSchema>;
