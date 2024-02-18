import { ZodError, type AnyZodObject } from "zod";

export type Details = Partial<Record<string, string>>;

export type Check = (value: any) => {
  success: boolean;
  details: Details;
};

export const error = (details: Details) => {
  return {
    success: false,
    details,
  };
};

export const success = () => {
  return {
    success: true,
    details: {} as unknown as Details,
  };
};

export const schemaHandler = (schema: AnyZodObject) => {
  const check: Check = (value) => {
    try {
      schema.parse(value);
      return success();
    } catch (err) {
      if (err instanceof ZodError) {
        return error(
          err.issues.reduce<Details>(
            (acc, { path, message }) => ({
              ...acc,
              [path[1]]: message,
            }),
            {},
          ),
        );
      }

      return error({});
    }
  };

  return check;
};
