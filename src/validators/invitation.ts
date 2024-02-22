import { schemaHandler } from "@/validators/validatorHandler";
import { z } from "zod";

const getSchema = z.object({
  query: z.object({
    id: z
      .string({
        required_error: "FORMAT",
        invalid_type_error: "FORMAT",
      })
      .uuid("FORMAT"),
  }),
});

export const get = schemaHandler(getSchema);
export type GetInvitationProps = z.infer<typeof getSchema>["query"];

export default {
  get,
};
