import { type URL } from "url";

export declare interface TextStyles {
  color?: "primary" | "secondary";
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "inherit";
  weight?: "light" | "normal" | "bold";
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
  flex?: Array<"row" | "column" | "ai-center" | "jc-center">;
  embed?: boolean;
}

export declare type TextProps<T> = TextStyles & React.HTMLAttributes<T>;
export declare type TextAnchorProps = TextStyles &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string | URL;
  };
