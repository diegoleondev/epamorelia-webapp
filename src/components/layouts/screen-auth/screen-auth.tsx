import Paragraph from "@/components/texts/paragraph";
import { ROUTES } from "@/constants";
import { IconButterfly } from "@/icons";
import Link from "next/link";
import styles from "./screen-auth.module.css";

interface LayoutScreenAuthProps {
  children: React.ReactNode;
}

export default function LayoutScreenAuth(props: LayoutScreenAuthProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href={ROUTES.HOME} replace prefetch scroll={false}>
          <div className={styles.logo}>
            <IconButterfly
              style={{
                color: "black",
                width: "100%",
                aspectRatio: "1/1",
              }}
            />
          </div>
        </Link>
      </header>
      <main className={styles.main}>
        <h2 className={styles.title}>9.º Congreso Nacional EPA</h2>
        {props.children}
      </main>
      <footer className={styles.footer}>
        <Paragraph size="small" align="center">
          Términos y Condiciones
        </Paragraph>
      </footer>
    </article>
  );
}
