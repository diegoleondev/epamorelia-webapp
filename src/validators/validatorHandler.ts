import { DETAILS } from "@/constants";
import { ZodError, type AnyZodObject } from "zod";

export type Details = Partial<Record<string, string>>;

export const error = (details: Details) => {
  return {
    data: null,
    success: false as const,
    details,
  };
};

export const success = () => {
  return {
    data: {},
    success: true as const,
    details: {} as unknown as Details,
  };
};

export const schemaHandler = (schema: AnyZodObject) => {
  const check = (value: any) => {
    try {
      schema.parse(value);
      return success();
    } catch (err) {
      if (err instanceof ZodError) {
        return error(
          err.issues.reduce<Details>(
            (acc, { path, message }) => ({
              ...acc,
              [path[path.length - 1]]: message,
            }),
            {},
          ),
        );
      }

      return error({
        _: DETAILS.UNKNOWN,
      });
    }
  };

  return check;
};
