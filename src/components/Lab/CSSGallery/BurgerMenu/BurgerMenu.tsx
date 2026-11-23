import cn from "classnames";

import styles from "./BurgerMenu.module.scss";

export const BurgerMenu = ({ className }: { className?: string }) => {
  return (
    <div className={cn(styles.burger, className)} id="burger">
      <input type="checkbox" />
      <div className={styles.mid}></div>
    </div>
  );
};
