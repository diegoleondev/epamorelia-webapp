import { findAllBranchesAPI } from "@/api/branch";
import { LayoutError, LayoutScreenGeneric, TableBranch } from "@/components";

export default async function BranchPage() {
  const branches = await findAllBranchesAPI();

  if (!branches.success) {
    return <LayoutError />;
  }

  return (
    <LayoutScreenGeneric title="Todas las sedes" href="/" padding={false}>
      <TableBranch data={branches.data} />
    </LayoutScreenGeneric>
  );
}
