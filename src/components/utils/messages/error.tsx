import { IconInfoCircleFilled } from "@/icons";
import styles from "./message.module.css";
import { type UtilMessage } from "./types";

export default function MessageError(props: UtilMessage) {
  if (typeof props.children !== "string") return null;
  if (props.children.length === 0) return null;

  return (
    <span className={styles.wrapper}>
      <i className={styles.icon}>
        <IconInfoCircleFilled />
      </i>
      <p className={styles.message}>{props.children}</p>
    </span>
  );
}
