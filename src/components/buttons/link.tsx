// https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component

import { ROUTES } from "@/constants";
import Link from "next/link";
import type { ButtonLinkProps, ButtonProps } from "./types";
import useButtonStyle from "./button";

// TODO: refactor to useButtonStyle
export default function ButtonLink(props: ButtonLinkProps) {
  const { type, ...attributes } = props;
  return (
    <Link
      href={props.href ?? ROUTES.HOME}
      {...(useButtonStyle(attributes as ButtonProps) as ButtonLinkProps)}
    >
      {props.children}
    </Link>
  );
}
