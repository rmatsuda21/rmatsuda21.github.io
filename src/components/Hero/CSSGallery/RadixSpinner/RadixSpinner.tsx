import cn from "classnames";

import styles from "./RadixSpinner.module.scss";

export const RadixSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, styles.spinner)}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
};
