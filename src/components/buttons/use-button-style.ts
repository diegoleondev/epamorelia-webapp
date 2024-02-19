import styles from "./button.module.css";
import type { UseButtonStyleProps } from "./types";

const getStyle = (styleFlag: string, prop: string | undefined) => {
  if (typeof prop !== "string") return "";

  const className = `${styleFlag}--${prop}`;
  return styles[className] ?? "";
};

export default function useButtonStyle(props: UseButtonStyleProps) {
  const className = [styles.button, getStyle("color", props.color)]
    .filter(Boolean)
    .join(" ");

  return {
    className,
  };
}
