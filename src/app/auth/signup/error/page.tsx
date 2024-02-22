import { ButtonLink } from "@/components";
import { ROUTES } from "@/constants";
import { IconCircleXFilled } from "@/icons";
import styles from "./sign-up-error.module.css";

export default function SignUpErrorPage() {
  return (
    <div className={styles.page}>
      <IconCircleXFilled size="large" />
      <span>
        <p>La Invitación ya a sido usada o no es valida. Solicita una nueva.</p>
      </span>
      <ButtonLink href={ROUTES.HOME}>ir al inicio</ButtonLink>
    </div>
  );
}
