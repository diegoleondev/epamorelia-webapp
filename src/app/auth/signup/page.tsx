"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ButtonAsync,
  ButtonLink,
  LayoutScreenAuth,
  UtilHrO,
  UtilMessageError,
} from "@/components";
import { ENV, ROUTES } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { IconEye, IconEyeOff } from "@/icons";
import { GetInvitationError } from "@/lib/errors/request-error";
import { invitation as Invitation } from "@/service";
import styles from "./sign-up.module.css";

const initialForm = {
  username: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const auth = useAuth();

  const searchParams = useSearchParams();
  const invitation = searchParams.get("i") ?? "";
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<any>({});

  const [sourceUserName, setSourceUserName] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await auth
      .signUp({ ...form, invitation })
      .then(setError)
      .catch(console.log);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (invitation.length === 0) return;

    Invitation.get({ id: invitation })
      .then(setSourceUserName)
      .catch((error) => {
        if (error instanceof GetInvitationError) {
          router.replace(ROUTES.SIGN_UP_ERROR);
        }
        console.log(error);
      });
  }, []);

  return (
    <LayoutScreenAuth>
      {invitation.length === 0 ? (
        <>
          <span className={styles.text}>
            <p>
              Trabajamos incansablemente para que formes parte de la comunidad.
            </p>
            <p>
              Mientras esperas, puedes unirte a nuestro servidor de Discord para
              mantenerte al tanto de las últimas novedades.
            </p>
          </span>
          <ButtonLink href={ENV.DISCORD_INVITE_URL}>Ir a Discord</ButtonLink>
        </>
      ) : (
        <>
          <span>
            <p>
              <strong>{sourceUserName ?? ""}</strong> te ha invitado a unirte a
              la comunidad Pony.
            </p>
          </span>
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
            <ButtonAsync onClick={handleSubmit} type="submit">
              registrarse
            </ButtonAsync>
          </form>
        </>
      )}
      <UtilHrO />
      <ButtonLink href={ROUTES.LOGIN} color="secondary">
        iniciar sesión
      </ButtonLink>
    </LayoutScreenAuth>
  );
}
