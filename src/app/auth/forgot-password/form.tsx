"use client";

import {
  ButtonAsync,
  Strong,
  Text,
  TextParagraph,
  UtilMessageError,
} from "@/components";
import { useAuth } from "@/hooks";
import { useState } from "react";

const initialForm = {
  email: "",
};

type FormData = typeof initialForm;
type FormErrors = Partial<Record<keyof FormData | "_", string>>;

export default function ForgotPasswordForm() {
  const auth = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [finished, setFinished] = useState(false);

  const handleChangeForm = (e: any) => {
    const { name, value } = e.target;

    setForm((s) => ({
      ...s,
      [name]: value,
    }));
  };

  const submit = async () => {
    await auth.forgotPassword(form).then(setErrors);

    setFinished(true);
  };

  if (!finished)
    return (
      <>
        <Text>
          <TextParagraph>
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </TextParagraph>
        </Text>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="label">
            <input
              type="email"
              placeholder="Correo Electrónico"
              onChange={handleChangeForm}
              name="email"
              value={form.email}
              className="input"
              autoComplete="email"
            />
            <UtilMessageError>{errors.email}</UtilMessageError>
          </label>
          <UtilMessageError>{errors._}</UtilMessageError>
          <ButtonAsync type="submit" onClick={submit}>
            enviar enlace
          </ButtonAsync>
        </form>
      </>
    );

  return (
    <Text>
      <TextParagraph>
        Hemos enviado un enlace a <Strong>{form.email}</Strong> para restablecer
        tu contraseña, expira en 5 minutos.
      </TextParagraph>
    </Text>
  );
}
