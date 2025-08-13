import { useRef } from "react";
import cn from "classnames";
import { FaApple, FaAtom, FaHatCowboySide } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

import styles from "@styles/MobileNav.module.css";

type Props = {
  incrementIndex: () => void;
  decrementIndex: () => void;
  setIndex: (index: number) => void;
};

export const MobileNav = ({
  incrementIndex,
  decrementIndex,
  setIndex,
}: Props) => {
  const touchStartPos = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartPos.current = e.touches[0].clientX;
    document.documentElement.style.overscrollBehavior = "none";
  };

  const handleTouchEnd = () => {
    document.documentElement.style.overscrollBehavior = "auto";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartPos.current === null) return;

    const touchEnd = e.touches[0].clientX;
    const distance = touchEnd - touchStartPos.current;

    if (distance > 50) {
      incrementIndex();
      touchStartPos.current = touchEnd;
    } else if (distance < -50) {
      decrementIndex();
      touchStartPos.current = touchEnd;
    }
  };

  return (
    <nav
      className={styles.nav}
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
