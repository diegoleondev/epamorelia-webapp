"use client";

import { useState } from "react";

import {
  Anchor,
  ButtonAsync,
  ButtonLink,
  LayoutScreenAuth,
  UtilHrO,
  UtilMessageError,
} from "@/components";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";
import styles from "./log-in.module.css";

const initialForm = {
  email: "",
  password: "",
};

type FormData = typeof initialForm;
type FormErrors = Partial<Record<keyof FormData | "_", string>>;

export default function LogInPage() {
  const auth = useAuth();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await auth.logIn(form).then(setError).catch(console.error);
  };

  return (
    <LayoutScreenAuth>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        noValidate
        className={styles.form}
      >
        <UtilMessageError>{error._}</UtilMessageError>
        <label className={styles.label}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            onChange={handleChange}
            name="email"
            value={form.email}
            className={styles.input}
            autoComplete="email"
          />
          <UtilMessageError>{error.email}</UtilMessageError>
        </label>
        <label className={styles.label}>
          <input
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            name="password"
            value={form.password}
            className={styles.input}
            autoComplete="current-password"
          />
          <UtilMessageError>{error.password}</UtilMessageError>
        </label>
        <Anchor href={ROUTES.FORGOT_PASSWORD} align="right">
          ¿Olvidaste tu contraseña?
        </Anchor>
        <ButtonAsync type="submit" onClick={handleSubmit}>
          iniciar sesión
        </ButtonAsync>
      </form>
      <UtilHrO />
      <ButtonLink href={ROUTES.SIGN_UP} color="secondary">
        registrarse
      </ButtonLink>
    </LayoutScreenAuth>
  );
}
