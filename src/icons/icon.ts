import parseClassNames from "@/utils/parseClassNames";
import styles from "./Icon.module.css";
import { type IconProps } from "./types";

export default function icon(props: IconProps) {
  const { className: classes, size, color, ...rest } = props;

  const className = parseClassNames(
    styles.icon,
    classes,
    styles[`size-${size ?? "full"}`],
    styles[`color-${color ?? "inherit"}`],
  );

  return {
    ...rest,
    className,
    style: props.style,
  };
}
