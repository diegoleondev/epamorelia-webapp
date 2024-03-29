import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal(props: Props) {
  const { open, onClose, children } = props;

  if (!open) return null;

  return createPortal(
    <div className={styles.bg} onClick={onClose}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
