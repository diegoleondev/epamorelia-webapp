import { findOneBranchAPI } from "@/api/branch";
import { findAllFormUserDataApi } from "@/api/form-user-data";
import {
  LayoutScreenGeneric,
  TableBranchFormsDataUsers,
  Title,
} from "@/components";

interface BranchFormsDataUser {
  params: {
    branchId: string;
  };
}

export default async function BranchFormsUserData(props: BranchFormsDataUser) {
  const { branchId } = props.params;

  const branch = await findOneBranchAPI({ id: branchId });

  const forms = await findAllFormUserDataApi({
    branchId,
  });

  if (!forms.success) {
    return (
      <LayoutScreenGeneric title="Formularios" href="/">
        <Title>Algo salio mal</Title>
      </LayoutScreenGeneric>
    );
  }

  return (
    <LayoutScreenGeneric
      href={`/`}
      title={`Asistentes de ${branch.data?.name ?? "Sede"}`}
      padding={false}
    >
      <TableBranchFormsDataUsers branchId={branchId} forms={forms.data} />
    </LayoutScreenGeneric>
  );
}
