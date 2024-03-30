import { findOneBranchAPI } from "@/api/branch";
import { ButtonLink, FormBranch, LayoutScreenGeneric } from "@/components";
import { ROUTES } from "@/constants";

interface UpdateBranchProps {
  params: {
    branchId: string;
  };
}

export default async function UpdateBranch(props: UpdateBranchProps) {
  const { branchId } = props.params;

  const { data } = await findOneBranchAPI({ id: branchId });

  if (data === undefined || data === null) {
    return <div>Branch not found</div>;
  }

  return (
    <LayoutScreenGeneric href={ROUTES.HOME} title="Branch">
      <FormBranch initialData={data} />

      <ButtonLink href={`${ROUTES.BRANCH}/${branchId}/users`}>
        Usuarios
      </ButtonLink>
      <ButtonLink href={`${ROUTES.BRANCH}/${branchId}/invitations`}>
        Invitaciones
      </ButtonLink>
      <ButtonLink href={`${ROUTES.BRANCH}/${branchId}/forms`}>
        Formularios
      </ButtonLink>
    </LayoutScreenGeneric>
  );
}
