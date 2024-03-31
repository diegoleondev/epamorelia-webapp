import { findAllBranchesAPI } from "@/api/branch";
import { Anchor, Text } from "@/components";
import { ROUTES } from "@/constants";
import styles from "./table.module.css";

export default async function Table() {
  const { data } = await findAllBranchesAPI();

  return (
    <section className={styles.table}>
      <div className={styles.row}>
        <Text>Sede</Text>
        <Text>Limite</Text>
        <Text>Registrados</Text>
      </div>
      {data?.map((branch) => (
        <Anchor key={branch.id} href={`${ROUTES.BRANCH}/${branch.id}`}>
          <Text>{branch.name}</Text>
          <Text>{branch.limit}</Text>
          <Text>0</Text>
        </Anchor>
      ))}
      <Anchor className={styles.row} href={`${ROUTES.BRANCH}/new `}>
        Agregar nueva sede
      </Anchor>
    </section>
  );
}
