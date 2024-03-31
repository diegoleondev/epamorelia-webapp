"use client";

import { findAllBranchUsersAPI } from "@/api/branch";
import { ROUTES } from "@/constants";
import parseClassNames from "@/utils/parseClassNames";
import { useEffect, useState } from "react";
import { Anchor, Text, UtilLoader } from "..";
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
        <Text className={styles.cell}>email</Text>
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
            <Text className={styles.cell}>{branch.email}</Text>
          </div>
        ))}
      </div>
      <Anchor className={styles.footer} href={`${ROUTES.USER}/new`}>
        Invitar usuario
      </Anchor>
    </section>
  );
}
