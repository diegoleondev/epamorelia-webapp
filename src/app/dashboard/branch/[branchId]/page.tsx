import { ButtonEmbed, LayoutScreenGeneric } from "@/components";
import { ROUTES } from "@/constants";
import { IconFiles, IconMapPin, IconUsers } from "@/icons";

interface UpdateBranchProps {
  params: {
    branchId: string;
  };
}

export default async function UpdateBranch(props: UpdateBranchProps) {
  const { branchId } = props.params;

  return (
    <LayoutScreenGeneric href={ROUTES.HOME} title="Mi Sede">
      <ButtonEmbed
        title="Sede"
        description={`Editar parámetros de la sede`}
        iconLeft={<IconMapPin size="small" />}
        href={`${ROUTES.BRANCH}/${branchId}/users`}
        color="secondary"
      />
      <ButtonEmbed
        title="Usuarios"
        description="Invitar, eliminar y gestionar usuarios"
        iconLeft={<IconUsers size="small" />}
        href={`${ROUTES.BRANCH}/${branchId}/users`}
        color="secondary"
      />
      <ButtonEmbed
        title="Formularios"
        description="Crear, editar y eliminar formularios"
        iconLeft={<IconFiles size="small" />}
        color="secondary"
        href={`${ROUTES.BRANCH}/${branchId}/forms`}
      />
    </LayoutScreenGeneric>
  );
}
