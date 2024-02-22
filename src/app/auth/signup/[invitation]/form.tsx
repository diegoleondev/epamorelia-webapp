"use client";

import { ButtonAsync, UtilMessageError } from "@/components";
import { useAuth } from "@/hooks";
import { IconEye, IconEyeOff } from "@/icons";
import { useState } from "react";
import styles from "../sign-up.module.css";

const initialForm = {
  username: "",
  email: "",
  password: "",
};

export default function SignUpForm(props: { invitation: string | null }) {
  const auth = useAuth();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<any>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (props.invitation === null) return;

    await auth
      .signUp({ ...form, invitation: props.invitation })
      .then(setError)
      .catch(console.log);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
      className={styles.form}
    >
      <label className={styles.label}>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          onChange={handleChange}
          name="username"
          value={form.username}
          className={styles.input}
          autoComplete="username"
        />
        <UtilMessageError>{error?.username}</UtilMessageError>
      </label>
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
        <UtilMessageError>{error?.email}</UtilMessageError>
      </label>
      <label className={styles["label-input-icon-error"]}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          onChange={handleChange}
          name="password"
          value={form.password}
          className={styles.input}
          autoComplete="new-password"
        />
        <div>
          {showPassword ? (
            <IconEyeOff onClick={handleToggleShowPassword} />
          ) : (
            <IconEye onClick={handleToggleShowPassword} />
          )}
        </div>
        <UtilMessageError>{error?.password}</UtilMessageError>
      </label>
      <UtilMessageError>{error?._}</UtilMessageError>
      <ButtonAsync onClick={handleSubmit} type="submit">
        registrarse
      </ButtonAsync>
    </form>
  );
}
