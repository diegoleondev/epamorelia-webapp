import styles from "./text.module.css";

interface ParagraphSkeletonProps {
  width?: string;
}

export default function TextSkeleton(props: ParagraphSkeletonProps) {
  return (
    <strong
      className={styles.skeleton}
      style={{
        width: props.width ?? "100%",
      }}
    />
  );
}
