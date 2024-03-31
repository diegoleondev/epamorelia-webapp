import { findOneBranchAPI } from "@/api/branch";
import { LayoutScreenGeneric, TableBranchUsers } from "@/components";
import { ROUTES } from "@/constants";

interface BranchUsersPageProps {
  params: {
    branchId: string;
  };
}

export default async function BranchUsersPage(props: BranchUsersPageProps) {
  const { branchId } = props.params;

  const branchResult = await findOneBranchAPI({ id: branchId });

  return (
    <LayoutScreenGeneric
      title={`Usuarios de ${branchResult.data?.name ?? "Sede"}`}
      href={`${ROUTES.BRANCH}/${branchId}`}
      padding={false}
    >
      <TableBranchUsers branchId={branchId} />
    </LayoutScreenGeneric>
  );
}
