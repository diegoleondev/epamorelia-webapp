"use client";

import { ButtonLink, CardUser } from "@/components";
import useUserContext from "@/contexts/user";
import styles from "./page.module.css";

export default function Home() {
  const user = useUserContext();

  return (
    <main className={styles.main}>
      <CardUser
        roleId={user.roleId}
        username={user.username}
        userId={user.id}
      />
      <section className={styles.menu}>
        <h2>Menu</h2>
        <ButtonLink href="/dashboard/branch">Todas las Sedes</ButtonLink>
        <ButtonLink href={`/dashboard/branch/${user.branchId}`}>
          Mi sede
        </ButtonLink>
      </section>
    </main>
  );
}
