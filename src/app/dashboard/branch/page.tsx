import { HeaderSection, TableBranch } from "@/components";
import { IconArrowLeft } from "@/icons";
import styles from "./branch.module.css";

export default async function BranchPage() {
  return (
    <article className={styles.article}>
      <HeaderSection title="Sedes" iconLeft={<IconArrowLeft />} href="/" />
      <main>
      <TableBranch />
      </main>
    </article>
  );
}
