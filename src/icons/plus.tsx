import icon from "./icon";
import { type IconProps } from "./types";

export default function Plus(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...icon(props)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
      <path d="M3 10h18" />
      <path d="M10 3v18" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
  );
}
