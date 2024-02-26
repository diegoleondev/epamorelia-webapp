import textStylesHandler from "./text-styles-handler";
import { type TextProps } from "./types";

export default function Paragraph(props: TextProps<HTMLElement>) {
  return <strong {...textStylesHandler(props)}>{props.children}</strong>;
}
