import type { ButtonProps } from "./types";
import useButtonStyle from "./use-button-style";

export default function Button(props: ButtonProps) {
  return (
    <button {...props} {...useButtonStyle(props)}>
      {props.children}
    </button>
  );
}
