import { ButtonLink, LayoutScreenAuth, Strong, UtilHrO } from "@/components";
import { ROUTES } from "@/constants";
import styles from "./sign-up.module.css";

export default async function SignUpPage() {
  return (
    <LayoutScreenAuth>
      <span className={styles.text}>
        <p>Para registrarte solista una cuenta a tu coordinador de sede.</p>
        <p>
          Si tienes problemas para registrarte, contáctenos en{" "}
          <Strong>ayuda@epamorelia.com</Strong>
        </p>
      </span>
      <ButtonLink href="mailto:diegoleon.dev@gmail.com">
        Enviar correo
      </ButtonLink>
      <UtilHrO />
      <ButtonLink href={ROUTES.LOG_IN} color="secondary">
        iniciar sesión
      </ButtonLink>
    </LayoutScreenAuth>
  );
}
