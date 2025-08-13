import { useRef } from "react";
import cn from "classnames";
import { FaApple, FaAtom, FaHatCowboySide } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

import styles from "@styles/MobileNav.module.css";

type Props = {
  setIndex: (index: number) => void;
};

export const MobileNav = ({ setIndex }: Props) => {
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = e.touches[0].clientX;
    document.documentElement.style.overscrollBehavior = "none";
  };

  const handleTouchEnd = () => {
    document.documentElement.style.overscrollBehavior = "auto";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;

    const touchEnd = e.touches[0].clientX;
    const distance = touchEnd - touchStart.current;

    const main = document.getElementById("main");
    const index = main?.style.getPropertyValue("--selected-index");
    if (distance > 50) {
      setIndex(Math.min(Number(index) + 1, 2));
      touchStart.current = touchEnd;
    } else if (distance < -50) {
      setIndex(Math.max(Number(index) - 1, 0));
      touchStart.current = touchEnd;
    }
  };

  return (
    <nav
      className={styles.nav}
      id="nav"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <FaHatCowboySide className={styles.icon} onClick={() => setIndex(0)} />
      <FaApple className={styles.icon} onClick={() => setIndex(1)} />
      <FaAtom className={styles.icon} onClick={() => setIndex(2)} />
      <div className={styles.arrows}>
        <MdArrowRightAlt className={cn(styles.arrow, styles.left)} />
        <span>Swipe</span>
        <MdArrowRightAlt className={styles.arrow} />
      </div>
    </nav>
  );
};
