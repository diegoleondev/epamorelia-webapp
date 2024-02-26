import textStylesHandler from "./text-styles-handler";
import { type TextProps } from "./types";

export default function Paragraph(props: TextProps<HTMLParagraphElement>) {
  return <p {...textStylesHandler(props)}>{props.children}</p>;
}
