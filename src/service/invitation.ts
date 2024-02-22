import { GetInvitationError } from "@/lib/errors/request-error";
import request from "@/lib/request";
import { invitation } from "@/validators";
import type { GetInvitationProps } from "@/validators/invitation";

async function get(props: GetInvitationProps) {
  const preRequest = invitation.get({ query: props });

  if (!preRequest.success) {
    throw new GetInvitationError({ details: preRequest.details });
  }

  const url = `/invitation?id=${props.id}`;
  const { success, details, data } = await request.get({ url, host: "api" });

  if (!success) throw new GetInvitationError({ details });

  return data.username as string | null;
}

export default { get };
