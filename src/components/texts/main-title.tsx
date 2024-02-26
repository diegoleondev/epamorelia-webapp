import textStylesHandler from "./text-styles-handler";
import { type TextProps } from "./types";

export default function MainTitle(props: TextProps<HTMLTitleElement>) {
  return <h1 {...textStylesHandler(props)}>{props.children}</h1>;
}
