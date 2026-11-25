import cn from "classnames";
import { FaHeart, FaCss3 } from "react-icons/fa6";
import { RiDragMove2Fill } from "react-icons/ri";

import { useStrings } from "@/i18n/LanguageContext";

import styles from "./IHeartCss.module.scss";

export const IHeartCss = ({ className }: { className?: string }) => {
  const t = useStrings().lab;

  return (
    <div className={cn(styles.iHeartCss, className)}>
      I
      <div className={styles.heart}>
        <FaHeart />
        <FaHeart className={styles.heart2} />
      </div>
      <FaCss3 />
      <p className={styles.scrollText}>
        {t.meta} <RiDragMove2Fill size={12} />
      </p>
    </div>
  );
};
