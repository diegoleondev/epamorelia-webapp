"use client";

import { findAllBranchUsersAPI } from "@/api/branch";
import { ROUTES } from "@/constants";
import parseClassNames from "@/utils/parseClassNames";
import { useEffect, useState } from "react";
import { ButtonLink, Text, UtilLoader } from "..";
import styles from "./table.module.css";

export default function BranchUsers(props: { branchId: string }) {
  const [data, setData] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    findAllBranchUsersAPI({ id: props.branchId })
      .then((response) => {
        if (response.success) {
          setData(response.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className={parseClassNames(styles.table, styles.formUserData)}>
      <div className={parseClassNames(styles.row, styles.header)}>
        <Text className={styles.cell}>Nombre</Text>
        <Text className={styles.cell}>Rol</Text>
      </div>
      {data === undefined && (
        <div className={styles.empty}>
          <UtilLoader />
        </div>
      )}
      <div className={styles.body}>
        {data?.map((branch) => (
          <div key={branch.id} className={styles.row}>
            <Text className={styles.cell}>{branch.username}</Text>
            <Text className={styles.cell}>{branch.roleId}</Text>
          </div>
        ))}
      </div>
      <ButtonLink href={`${ROUTES.USER}/new`} color="secondary">
        Invitar usuario
      </ButtonLink>
    </section>
  );
}
