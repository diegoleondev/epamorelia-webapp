"use client";

import { ButtonEmbed, CardUser } from "@/components";
import { ROUTES } from "@/constants";
import ROLES from "@/constants/roles";
import useUserContext from "@/contexts/user";
import { IconFiles, IconMapPins, IconUsers, IconWhatsapp } from "@/icons";
import whatsappLink from "@/utils/whatsapp-link";
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
        {user.role >= ROLES.ADMIN && (
          <ButtonEmbed
            title="Todas las sedes"
            href="/dashboard/branch"
            description="Ver todas las sedes"
            iconLeft={<IconMapPins size="small" />}
            color="secondary"
          />
        )}
        {/* <ButtonEmbed
          title="Mi sede"
          href={`/dashboard/branch/${user.branchId}`}
          description="Equipo y Asistentes"
          iconLeft={<IconMapPin size="small" />}
          color="secondary"
        /> */}
        <ButtonEmbed
          title="Equipo"
          description="Invitar, eliminar y ver miembros del equipo"
          iconLeft={<IconUsers size="small" />}
          href={`${ROUTES.BRANCH}/${user.branchId}/users`}
          color="secondary"
        />
        <ButtonEmbed
          title="Asistentes"
          description="Invitar, eliminar, ver asistentes"
          iconLeft={<IconFiles size="small" />}
          color="secondary"
          href={`${ROUTES.BRANCH}/${user.branchId}/forms`}
        />
        <ButtonEmbed
          title="Ayuda"
          description="Resuelve tus dudas y problemas sobre la plataforma"
          iconLeft={<IconWhatsapp size="small" />}
          color="secondary"
          href={whatsappLink({
            phone: "524434923398",
            message: `¡Hola! Necesito ayuda. Este es mi EPA ID: ${user.id}`,
          })}
        />
      </section>
    </main>
  );
}
