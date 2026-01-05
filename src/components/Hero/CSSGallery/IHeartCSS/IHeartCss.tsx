import cn from "classnames";
import { FaHeart, FaCss3 } from "react-icons/fa6";
import { RiDragMove2Fill } from "react-icons/ri";

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
      <p className={styles.scrollText}>
        Drag me around <RiDragMove2Fill size={12} />
      </p>
    </div>
  );
};
