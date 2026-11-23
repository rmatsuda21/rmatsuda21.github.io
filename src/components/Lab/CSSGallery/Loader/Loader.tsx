import cn from "classnames";

import styles from "./Loader.module.scss";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, styles.wrapper, "awesome-loader")}>
      <svg className={styles.loader} viewBox="0 0 50 50">
        <circle className={styles.path} cx="25" cy="25" fill="none" />
      </svg>
    </div>
  );
};
