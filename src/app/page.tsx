"use client";

import { ButtonAsync } from "@/components";
import { useAuth } from "@/hooks";
import styles from "./page.module.css";

export default function Home() {
  const auth = useAuth();

  return (
    <main className={styles.main}>
      <span className={styles.text}>
        <i className={styles.hero_icon}>
          <i>🙋‍♂️</i>
        </i>
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
