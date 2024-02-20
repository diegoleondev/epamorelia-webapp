import textStylesHandler from "./text-styles-handler";
import { type TextProps } from "./types";

export default function Text(props: TextProps) {
  return <span {...textStylesHandler(props)}>{props.children}</span>;
}
