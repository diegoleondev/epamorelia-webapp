import {
  LayoutScreenAuth,
  Text,
  TextParagraph,
  TextSkeleton,
} from "@/components";
import { Suspense } from "react";
import SignUpForm from "./form";
import SourceUsername from "./sourceUsername";

export default async function Page({
  params,
}: {
  params: { invitation: string };
}) {
  return (
    <LayoutScreenAuth>
      <Text flex={["column", "ai-center"]}>
        <Suspense fallback={<TextSkeleton width="5em" />}>
          <SourceUsername invitation={params.invitation} />
        </Suspense>
        <TextParagraph align="center">
          Te ha invitado a unirte a la comunidad Pony
        </TextParagraph>
      </Text>
      <SignUpForm invitation={params.invitation} />
    </LayoutScreenAuth>
  );
}
