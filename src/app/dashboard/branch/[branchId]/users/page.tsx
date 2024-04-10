import { findAllBranchUsersAPI, findOneBranchAPI } from "@/api/branch";
import { findAllUserInvitationsApi } from "@/api/user-invitation";
import { LayoutScreenGeneric, TableBranchInvitations } from "@/components";

interface BranchUsersPageProps {
  params: {
    branchId: string;
  };
}

type UsersIndexed = Record<string, Omit<User, "id">>;

export default async function BranchUsersPage(props: BranchUsersPageProps) {
  const { branchId } = props.params;

  const branchResult = await findOneBranchAPI({ id: branchId });

  const userInvitationsResult = await findAllUserInvitationsApi({
    branchId,
  });

  const usersResult = await findAllBranchUsersAPI({ id: branchId });
  const usersIndexed: UsersIndexed =
    usersResult.data?.reduce(
      (acc, { id, ...rest }) => ({ ...acc, [id]: rest }),
      {},
    ) ?? {};

  const data = userInvitationsResult.data?.map((invitation) => ({
    id: invitation.id,
    sourceUserName: usersIndexed[invitation.sourceUserId]?.username,
    targetUserName: usersIndexed[invitation.targetUserId ?? ""]?.username,
    roleId: invitation.roleId,
    reference: invitation.reference,
  }));

  return (
    <LayoutScreenGeneric
      title={`Usuarios de ${branchResult.data?.name ?? "Sede"}`}
      href={`/`}
      padding={false}
    >
      <TableBranchInvitations data={data} />
    </LayoutScreenGeneric>
  );
}
