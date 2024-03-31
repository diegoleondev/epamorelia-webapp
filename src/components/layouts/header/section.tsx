"use client";

import { Button, ButtonLink, MainTitle } from "@/components";
import style from "./header.module.css";

interface HeaderSectionProps {
  iconLeft?: React.ReactNode;
  href?: string;
  title?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<unknown>;
}

export default function HeaderSection(props: HeaderSectionProps) {
  const itemLeft =
    props.iconLeft !== undefined ? (
      <ButtonLink icon href={props.href} color="transparent">
        {props.iconLeft}
      </ButtonLink>
    ) : (
      <div></div>
    );

  const itemRight =
    props.iconRight !== undefined ? (
      <Button icon color="transparent" onClick={props.onClick}>
        {props.iconRight}
      </Button>
    ) : (
      <div></div>
    );

  return (
    <header className={style.section}>
      {itemLeft}
      <MainTitle size="large">{props.title}</MainTitle>
      {itemRight}
    </header>
  );
}
