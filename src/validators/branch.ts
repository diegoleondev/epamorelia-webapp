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

export const branchIdSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .uuid(DETAILS.FORMAT);

// VALIDATORS
const findOneSchema = zod.object({
  id: branchIdSchema,
});
export const findOneBranchValidator = schemaHandler(findOneSchema);
export type findOmeBranchProps = z.infer<typeof findOneSchema>;

const findAllBranchUsersSchema = zod.object({
  id: branchIdSchema,
});
export const findAllBranchUsersValidator = schemaHandler(
  findAllBranchUsersSchema,
);
export type FindAllBranchUsersProps = z.infer<typeof findAllBranchUsersSchema>;

const createSchema = zod.object({
  name: nameSchema,
  limit: limitSchema,
});
export const createBranchValidator = schemaHandler(createSchema);
export type CreateBranchProps = z.infer<typeof createSchema>;

const updateBranch = zod.object({
  id: branchIdSchema,
  name: nameSchema.optional(),
  limit: limitSchema.optional(),
});
export const updateBranchValidator = schemaHandler(updateBranch);
export type UpdateBranchProps = z.infer<typeof updateBranch>;
