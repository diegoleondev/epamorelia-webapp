// https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component

import { ROUTES } from "@/constants";
import Link from "next/link";
import type { ButtonLinkProps } from "./types";
import useButtonStyle from "./use-button-style";

export default function ButtonLink(props: ButtonLinkProps) {
  return (
    <Link href={props.href ?? ROUTES.HOME} {...useButtonStyle(props)}>
      {props.children}
    </Link>
  );
}
