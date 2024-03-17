import { type Details } from "@/validators/validatorHandler";
import { camelToSnake } from "./parse";

type Dictionary = Record<string, Record<string, string>>;

interface DetailsToMessageProps {
  dictionary: Dictionary;
  details: Details;
}

function detailToMessage(
  dictionary: Dictionary,
  element: string,
  typeError: string | undefined,
) {
  if (typeof typeError !== "string") return undefined;

  const messages = dictionary[camelToSnake(element).toLocaleUpperCase()];
  if (messages === undefined) return String(typeError);

  const message = messages[typeError.toUpperCase()];

  return String(message ?? typeError);
}

export function detailsToMessage(props: DetailsToMessageProps) {
  const { dictionary, details } = props;

  const keys = Object.keys(details);

  return keys.reduce<Details>((acc, key) => {
    const value = detailToMessage(dictionary, key, details[key]);

    if (value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {});
}
