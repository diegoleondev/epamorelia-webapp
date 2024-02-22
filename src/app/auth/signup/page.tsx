import { ButtonLink, LayoutScreenAuth, UtilHrO } from "@/components";
import { ENV, ROUTES } from "@/constants";
import styles from "./sign-up.module.css";

export default async function SignUpPage() {
  return (
    <LayoutScreenAuth>
      <span className={styles.text}>
        <p>Trabajamos incansablemente para que formes parte de la comunidad.</p>
        <p>
          Mientras esperas, puedes unirte a nuestro servidor de Discord para
          mantenerte al tanto de las últimas novedades.
        </p>
      </span>
      <ButtonLink href={ENV.DISCORD_INVITE_URL}>Ir a Discord</ButtonLink>
      <UtilHrO />
      <ButtonLink href={ROUTES.LOG_IN} color="secondary">
        iniciar sesión
      </ButtonLink>
    </LayoutScreenAuth>
  );
}
