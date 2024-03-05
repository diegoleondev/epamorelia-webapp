"use client";

import { ROUTES } from "@/constants";
import { IconChevronRight, IconUser } from "@/icons";
import { Anchor } from "..";
import Paragraph from "../texts/paragraph";
import style from "./card.module.css";

interface CardUserProps {
  userId: string;
  username: string;
  roleId: string;
}

export default function CardUser(props: CardUserProps) {
  return (
    <Anchor
      href={`${ROUTES.PROFILE}/${props.userId}`}
      className={style.cardUser}
    >
      <div>
        <IconUser />
      </div>
      <span>
        <Paragraph>{props.username}</Paragraph>
        <Paragraph size="small">{props.roleId}</Paragraph>
      </span>
      <IconChevronRight />
    </Anchor>
  );
}
