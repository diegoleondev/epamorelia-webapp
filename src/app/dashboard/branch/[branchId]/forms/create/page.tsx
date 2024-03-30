import { FormUserData, LayoutScreenGeneric } from "@/components";

interface Props {
  params: {
    branchId: string;
  };
}

export default function CreateFormUserData(props: Props) {
  const { branchId } = props.params;

  return (
    <LayoutScreenGeneric
      title="Crear formulario de usuario"
      href={`/dashboard/branch/${branchId}/forms`}
    >
      <FormUserData branchId={branchId} />
    </LayoutScreenGeneric>
  );
}
