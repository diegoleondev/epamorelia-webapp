import { DETAILS } from "@/constants";
import { z } from "zod";
import { branchIdSchema } from "./branch";
import { schemaHandler } from "./validatorHandler";

const textSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(2, DETAILS.SHORT)
  .max(200, DETAILS.LONG);

const idSchema = z.string({
  required_error: DETAILS.EMPTY,
  invalid_type_error: DETAILS.TYPE,
});

const userTypeSchema = z.number({
  required_error: DETAILS.EMPTY,
  invalid_type_error: DETAILS.TYPE,
});

const nameSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(3, DETAILS.SHORT)
  .max(30, DETAILS.LONG);

const phoneSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(10, DETAILS.SHORT)
  .max(15, DETAILS.LONG);

const sexSchema = z.boolean({
  required_error: DETAILS.EMPTY,
  invalid_type_error: DETAILS.TYPE,
});

const emergencyContactFullNameSchema = nameSchema;
const emergencyContactPhoneSchema = phoneSchema;
const allergiesSchema = textSchema;
const diseasesSchema = textSchema;
const medicineSchema = textSchema;

/* GET ONE */
const getFormUserDataSchema = z.object({
  id: idSchema,
});
export const findOneFormUserDataValidator = schemaHandler(
  getFormUserDataSchema,
);
export type FindOneFormUserDataOptions = z.infer<typeof getFormUserDataSchema>;

/* GET ALL */
const getAllFormUserDataSchema = z.object({
  branchId: branchIdSchema.optional(),
});
export const FindAllFormUserDataValidator = schemaHandler(
  getAllFormUserDataSchema,
);
export type FindAllFormUserDataOptions = z.infer<
  typeof getAllFormUserDataSchema
>;

/* CREATE */
const createFormUserDataSchema = z.object({
  branchId: branchIdSchema,
  name: nameSchema,
  surname: nameSchema.optional(),
});
export const createFormUserDataValidator = schemaHandler(
  createFormUserDataSchema,
);
export type CreateFormUserDataOptions = z.infer<
  typeof createFormUserDataSchema
>;

/* UPDATE ADMIN */
const updateFormUserDataSchema = z.object({
  id: idSchema,
  editable: z.boolean().optional(),
  deleted: z.boolean().optional(),
});
export const updateFormUserDataValidator = schemaHandler(
  updateFormUserDataSchema,
);

/* UPDATE PUBLIC */
const updateFormUserDataPublicSchema = z.object({
  id: idSchema,
  editable: z.boolean().optional(),
  deleted: z.boolean().optional(),
  userType: userTypeSchema.optional(),
  name: nameSchema.optional(),
  surname: nameSchema.optional(),
  phone: phoneSchema.optional(),
  sex: sexSchema.optional(),
  emergencyContactFullName: emergencyContactFullNameSchema.optional(),
  emergencyContactPhone: emergencyContactPhoneSchema.optional(),
  allergies: allergiesSchema.optional(),
  diseases: diseasesSchema.optional(),
  medicine: medicineSchema.optional(),
});
export const updateFormUserDataPublicValidator = schemaHandler(
  updateFormUserDataPublicSchema,
);
export type UpdateFormUserDataOptions = z.infer<
  typeof updateFormUserDataPublicSchema
>;

/* DELETE */
const deleteFormUserDataSchema = z.object({
  id: idSchema,
});
export const deleteFormUserDataValidator = schemaHandler(
  deleteFormUserDataSchema,
);
export type DeleteFormUserDataOptions = z.infer<
  typeof deleteFormUserDataSchema
>;
