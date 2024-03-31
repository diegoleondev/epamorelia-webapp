import { z } from "zod";
import { schemaHandler } from "./validatorHandler";

const idSchema = z.string();

const findOneUserSchema = z.object({
  id: idSchema,
});
export const findOneUserValidator = schemaHandler(findOneUserSchema);
export type FindOneUserProps = z.infer<typeof findOneUserSchema>;
