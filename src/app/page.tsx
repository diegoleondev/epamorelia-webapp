"use client";

import { ButtonAsync, ButtonLink } from "@/components";
import { ENV } from "@/constants";
import { useAuth } from "@/hooks";
import styles from "./page.module.css";

export default function Home() {
  const auth = useAuth();

  return (
    <main className={styles.main}>
      <span className={styles.text}>
        <i className={styles.hero_icon}>
          <i>🐎</i>
        </i>
        <h1>Bienvenido a la versión beta cerrada de Tu Pony App</h1>
        <p>
          Estamos encantados de tenerte aquí. Te invitamos a compartir cualquier
          error, detalle, sugerencia o comentario que puedas tener sobre la
          aplicación en nuestra comunidad de Discord.
        </p>
        <p>
          Tu retroalimentación es invaluable para nosotros y nos ayuda a mejorar
          constantemente la experiencia de Tu Pony App.
        </p>
        <ButtonLink color="secondary" href={ENV.DISCORD_INVITE_URL}>
          Ir a discord
        </ButtonLink>
      </span>
      <section>
        <h2>Configuración</h2>
        <ButtonAsync
          color="secondary"
          onClick={async () => await auth.logOut().catch(console.error)}
        >
          cerrar sesión
        </ButtonAsync>
      </section>
    </main>
  );
}
