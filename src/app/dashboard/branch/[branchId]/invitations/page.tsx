import { findOneBranchAPI } from "@/api/branch";
import { LayoutScreenGeneric, TableBranchInvitations } from "@/components";

interface BranchInvitationsProps {
  params: {
    branchId: string;
  };
}

export default async function BranchInvitations(props: BranchInvitationsProps) {
  const { branchId } = props.params;

  const branchResult = await findOneBranchAPI({ id: branchId });

  return (
    <LayoutScreenGeneric
      href={`/`}
      title={`Invitaciones de ${branchResult.data?.name ?? "Sede"}`}
      padding={false}
    >
      <TableBranchInvitations branchId={branchId} />
    </LayoutScreenGeneric>
  );
}
