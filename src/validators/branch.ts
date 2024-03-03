import zod, { z } from "zod";

import { DETAILS } from "../constants/index";
import { schemaHandler } from "./validatorHandler";

// SCHEMAS
const nameSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(3, DETAILS.SHORT)
  .max(25, DETAILS.LONG);

const limitSchema = z
  .number({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .int()
  .min(1, DETAILS.MIN)
  .max(1000, DETAILS.MAX);

const idSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .uuid(DETAILS.FORMAT);

// VALIDATORS
const getSchema = zod.object({
  id: idSchema,
});
export const getBranchValidator = schemaHandler(getSchema);
export type GetBranchProps = z.infer<typeof getSchema>;

const getBranchUsersSchema = zod.object({
  id: idSchema,
});
export const getBranchUsersValidator = schemaHandler(getBranchUsersSchema);
export type GetBranchUsersProps = z.infer<typeof getBranchUsersSchema>;

const createSchema = zod.object({
  name: nameSchema,
  limit: limitSchema,
});
export const createBranchValidator = schemaHandler(createSchema);
export type CreateBranchProps = z.infer<typeof createSchema>;

const updateBranch = zod.object({
  id: idSchema,
  name: nameSchema.optional(),
  limit: limitSchema.optional(),
});
export const updateBranchValidator = schemaHandler(updateBranch);
export type UpdateBranchProps = z.infer<typeof updateBranch>;
