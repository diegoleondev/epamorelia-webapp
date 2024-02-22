import type React from "react";
import { type SVGProps } from "react";

export declare type IconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: "em" | "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "error"
    | "success"
    | "warning";
} & SVGProps<SVGSVGElement>;
