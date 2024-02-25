import { Strong } from "@/components";
import Paragraph from "@/components/texts/paragraph";
import styles from "./subject-review.module.css";

interface SubjectReviewProps {
  teacherName: string;
  points: number;
}

export default function SubjectReview(props: SubjectReviewProps) {
  return (
    <i className={styles.container}>
      <Strong>{props.teacherName}</Strong> <Paragraph>{props.points}</Paragraph>
    </i>
  );
}
