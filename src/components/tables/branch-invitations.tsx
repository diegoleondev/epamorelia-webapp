import { findAllBranchUsersAPI } from "@/api/branch";
import { findAllUserInvitationsApi } from "@/api/user-invitation";
import { ROUTES } from "@/constants";
import { Anchor, Text } from "..";
import styles from "./table.module.css";

interface BranchInvitationsProps {
  branchId: string;
}

type UsersIndexed = Record<string, Omit<User, "id">>;

export default async function BranchInvitations(props: BranchInvitationsProps) {
  const { branchId } = props;

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
  }));

  return (
    <section className={styles.table}>
      <div className={styles.row}>
        <Text>Origen</Text>
        <Text>Objetivo</Text>
        <Text>role</Text>
      </div>
      {data?.map((branch) => (
        <Anchor key={branch.id} href={`${ROUTES.BRANCH}/${branch.id}`}>
          <Text>{branch.sourceUserName}</Text>
          <Text>{branch.targetUserName}</Text>
          <Text>{branch.roleId}</Text>
        </Anchor>
      ))}
      <Anchor className={styles.row} href={`${ROUTES.USER}/new`}>
        Invitar usuario
      </Anchor>
    </section>
  );
}
