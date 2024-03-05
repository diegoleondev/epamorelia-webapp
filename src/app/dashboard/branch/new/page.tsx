import { FormBranch, LayoutScreenGeneric } from "@/components";
import { ROUTES } from "@/constants";

export default function NewBranchPage() {
  return (
    <LayoutScreenGeneric href={ROUTES.BRANCH} title="Nueva Sede">
      <FormBranch />
    </LayoutScreenGeneric>
  );
}
