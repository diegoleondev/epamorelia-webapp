"use client";

import { findAllBranchUsersAPI } from "@/api/branch";
import { ROUTES } from "@/constants";
import { useEffect, useState } from "react";
import { Anchor, Text } from "..";
import styles from "./table.module.css";

export default function BranchUsers(props: { branchId: string }) {
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    findAllBranchUsersAPI({ id: props.branchId })
      .then((response) => {
        if (response.success) {
          setData(response.data);
          setError("");
          return;
        }

        setError(response.details._ ?? "");
      })
      .catch(() => {});
  }, []);

  if (error !== "") {
    return <div>Algo salio mal</div>;
  }

  if (data === undefined || data === null) {
    return <div>No hay usuarios</div>;
  }

  return (
    <section className={`${styles.table} ${styles.tableBranchUsers}`}>
      <div className={styles.row}>
        <Text>Nombre</Text>
        <Text>Rol</Text>
        <Text>email</Text>
      </div>
      {data.map((branch) => (
        <Anchor key={branch.id} href={`${ROUTES.BRANCH}/${branch.id}`}>
          <Text>{branch.username}</Text>
          <Text>{branch.roleId}</Text>
          <Text>{branch.email}</Text>
        </Anchor>
      ))}
      <Anchor className={styles.row} href={`${ROUTES.USER}/new`}>
        Invitar usuario
      </Anchor>
    </section>
  );
}
