import { IconArrowLeft } from "@/icons";
import HeaderSection from "../header/section";
import styles from "./screen-generic.module.css";

interface ScreenGenericProps {
  title: string;
  href: string;
  children: React.ReactNode;
  classContainer?: string;
  padding?: boolean;
}

export default function LayoutScreenGeneric(props: ScreenGenericProps) {
  return (
    <article className={styles.article}>
      <HeaderSection
        title={props.title}
        iconLeft={<IconArrowLeft />}
        href={props.href}
      />
      <main className={`${styles.main} ${(props.padding ?? true) && "pd"}`}>
        {props.children}
      </main>
    </article>
  );
}
