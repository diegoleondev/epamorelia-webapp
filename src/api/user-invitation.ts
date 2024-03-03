import requestCSR from "@/utils/request-csr";
import {
  getInvitationValidator,
  type GetInvitationProps,
} from "@/validators/invitation";

export async function getUserInvitationApi(props: GetInvitationProps) {
  const preRequest = getInvitationValidator({ query: props });
  if (!preRequest.success) return preRequest;

  const url = `/invitation?id=${props.id}`;
  return await requestCSR<string>({ url, host: "api", method: "GET" });
}
