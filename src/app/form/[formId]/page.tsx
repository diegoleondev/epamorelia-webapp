import { findOneFormUserDataApi } from "@/api/form-user-data";
import { FormUserDataPublic, LayoutScreenAuth } from "@/components";
import Paragraph from "@/components/texts/paragraph";

interface FormProps {
  params: {
    formId: string;
  };
}
export default async function Form(props: FormProps) {
  const { formId } = props.params;

  const form = await findOneFormUserDataApi({ id: formId });

  if (!form.success) {
    return (
      <LayoutScreenAuth>
        <Paragraph>El formulario no existe o fue eliminado</Paragraph>
      </LayoutScreenAuth>
    );
  }

  return (
    <LayoutScreenAuth>
      <Paragraph>
        EPA Morelia te invita a completar tus datos para poder ofrecerte un
        servicio más efectivo y brindarte asistencia en caso de emergencia
        durante el Octavo Congreso Nacional 2024.
      </Paragraph>
      <FormUserDataPublic data={form.data} />
    </LayoutScreenAuth>
  );
}
