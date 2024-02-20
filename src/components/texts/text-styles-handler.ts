import parseClassNames from "@/utils/parseClassNames";
import styles from "./text.module.css";
import { type TextProps } from "./types";

export default function textStylesHandler(props: TextProps) {
  const className = parseClassNames(
    styles.text,
    styles[`color--${props.color ?? "primary"}`],
    styles[`size--${props.size ?? "inherit"}`],
    styles[`weight--${props.weight ?? "normal"}`],
    styles[`align--${props.align ?? "left"}`],
    props.flex !== undefined && styles.flex,
    props.flex?.map((flex) => styles[`flex--${flex}`]),
  );

  return {
    className,
    style: props.style,
  };
}
