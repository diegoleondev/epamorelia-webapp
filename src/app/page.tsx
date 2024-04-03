"use client";

import { ButtonEmbed, CardUser } from "@/components";
import useUserContext from "@/contexts/user";
import { IconMapPin, IconMapPins } from "@/icons";
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
        <ButtonEmbed
          title="Todas las sedes"
          href="/dashboard/branch"
          description="Ver todas las sedes"
          iconLeft={<IconMapPins size="small" />}
          color="secondary"
        />
        <ButtonEmbed
          title="Mi sede"
          href={`/dashboard/branch/${user.branchId}`}
          description="Equipo y Asistentes"
          iconLeft={<IconMapPin size="small" />}
          color="secondary"
        />
      </section>
    </main>
  );
}
