import { IconChevronRight } from "@/icons";
import { ButtonLink, Text } from "..";
import Paragraph from "../texts/paragraph";
import { type ButtonEmbedProps } from "./types";

export default function Embed(props: ButtonEmbedProps) {
  const { description, title, iconLeft, iconRight, ...rest } = props;
  return (
    <ButtonLink
      {...rest}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: "1rem",
      }}
    >
      {iconLeft}
      <Text
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignSelf: "center",
        }}
      >
        <Paragraph>{title}</Paragraph>
        <Paragraph
          weight="light"
          size="small"
          style={{
            textTransform: "none",
          }}
        >
          {description}
        </Paragraph>
      </Text>
      {iconRight ?? <IconChevronRight size="small" />}
    </ButtonLink>
  );
}
