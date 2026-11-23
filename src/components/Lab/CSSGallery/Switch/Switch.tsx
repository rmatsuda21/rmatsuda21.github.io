import cn from "classnames";

import styles from "./Switch.module.scss";

export const Switch = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <input type="checkbox" id="best-switch-ever" />
      <div className={styles.slider} />
    </div>
  );
};
