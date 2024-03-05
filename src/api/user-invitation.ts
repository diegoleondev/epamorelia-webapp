import requestCSR from "@/utils/request-csr";
import requestSSR from "@/utils/request-srr";
import { objectToSearchParams } from "@/utils/url";
import {
  createInvitationValidator,
  findAllUserInvitationsValidator,
  findOneUserInvitationValidator,
  type CreateUserInvitationProps,
  type FindAllUserInvitationsProps,
  type FindUserInvitationProps,
} from "@/validators/user-invitation";

type UserInvitationEnriched = {
  sourceUserName: string;
  targetUserName: string | null;
  branchName: string | null;
} & UserInvitation;

export async function findOneUserInvitationApi(props: FindUserInvitationProps) {
  const preRequest = findOneUserInvitationValidator(props);
  if (!preRequest.success) return preRequest;

  return await requestCSR<UserInvitationEnriched>({
    url: `/user-invitation/${props.id}`,
    host: "api",
    method: "GET",
  });
}

export async function findAllUserInvitationsApi(
  props: FindAllUserInvitationsProps,
) {
  const preRequest = findAllUserInvitationsValidator(props);
  if (!preRequest.success) return preRequest;

  const query = objectToSearchParams(props);

  return await requestSSR<UserInvitation[]>({
    url: `/user-invitations?${query}`,
    host: "api",
    method: "GET",
  });
}

export async function createUserInvitationApi(
  props: CreateUserInvitationProps,
) {
  const preRequest = createInvitationValidator(props);
  if (!preRequest.success) return preRequest;

  return await requestCSR<{ id: string }>({
    url: "/user-invitation",
    host: "api",
    method: "POST",
    body: props,
  });
}
