import Paragraph from "@/components/texts/paragraph";
import { ROUTES } from "@/constants";
import { invitation as Invitation } from "@/service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SourceUsername(props: { invitation: string }) {
  let sourceUserName: string | null = null;

  try {
    sourceUserName = await Invitation.get({ id: props.invitation });
  } catch (error) {
    redirect(ROUTES.SIGN_UP_ERROR);
  }

  return (
    <Paragraph size="large" weight="bold">
      {sourceUserName}
    </Paragraph>
  );
}
