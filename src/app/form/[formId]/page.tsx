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
        Hola {form.data.name}, EPA Arquidiócesis de Morelia, te invita a
        completar los siguientes datos para ofrecerte un servicio más efectivo
        durante el Congreso Nacional.
      </Paragraph>
      <FormUserDataPublic data={form.data} />
    </LayoutScreenAuth>
  );
}
