import cn from "classnames";
import { FaHeart, FaCss3 } from "react-icons/fa6";

import styles from "./IHeartCss.module.scss";

export const IHeartCss = ({ className }: { className?: string }) => {
  return (
    <div className={cn(styles.iHeartCss, className)}>
      I
      <div className={styles.heart}>
        <FaHeart />
        <FaHeart className={styles.heart2} />
      </div>
      <FaCss3 />
    </div>
  );
};
