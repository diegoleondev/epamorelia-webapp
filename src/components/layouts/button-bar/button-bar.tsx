import styles from "./button-bar.module.css";

interface Props {
  children: React.ReactNode;
}

export default function ButtonBar(props: Props) {
  return <nav className={styles.nav}>{props.children}</nav>;
}
