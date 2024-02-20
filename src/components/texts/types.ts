export declare interface TextProps {
  color?: "primary" | "secondary";
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "inherit";
  weight?: "light" | "normal" | "bold";
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
  flex?: Array<"row" | "column" | "ai-center" | "jc-center">;
}
