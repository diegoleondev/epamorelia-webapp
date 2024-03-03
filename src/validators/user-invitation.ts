import { DETAILS } from "@/constants";
import { schemaHandler } from "@/validators/validatorHandler";
import { z } from "zod";

const idSchema = z
  .string({
    required_error: DETAILS.FORMAT,
    invalid_type_error: DETAILS.FORMAT,
  })
  .uuid(DETAILS.FORMAT);

const getSchema = z.object({
  id: idSchema,
});

export const getInvitationValidator = schemaHandler(getSchema);
export type GetInvitationProps = z.infer<typeof getSchema>;
