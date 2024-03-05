import { findOneUserInvitationApi } from "@/api/user-invitation";
import { LayoutScreenAuth, Text, TextParagraph } from "@/components";
import Paragraph from "@/components/texts/paragraph";
import { ROUTES } from "@/constants";
import { redirect } from "next/navigation";
import SignUpForm from "./form";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { invitation: string };
}) {
  const result = await findOneUserInvitationApi({ id: params.invitation });

  if (!result.success) {
    return redirect(ROUTES.SIGN_UP_ERROR);
  }

  console.log(result);
  return (
    <LayoutScreenAuth>
      <Text flex={["column", "ai-center"]}>
        <Paragraph size="large" weight="bold">
          {result.data.sourceUserName}
        </Paragraph>
        <TextParagraph align="center">
          Te ha invitado a unirte a la sede {result.data.branchName} como{" "}
          {result.data.roleId}
        </TextParagraph>
      </Text>
      <SignUpForm invitation={params.invitation} />
    </LayoutScreenAuth>
  );
}
