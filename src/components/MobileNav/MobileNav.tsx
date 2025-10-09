import { useRef, useState } from "react";
import cn from "classnames";
import { FaBriefcase, FaFolderOpen, FaHatCowboySide } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

import styles from "./MobileNav.module.scss";

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
  const [hasBeenSwiped, setHasBeenSwiped] = useState(false);

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
      setHasBeenSwiped(true);
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
      <FaBriefcase className={styles.icon} onClick={() => setIndex(1)} />
      <FaFolderOpen className={styles.icon} onClick={() => setIndex(2)} />
      <div className={cn(styles.arrows, { [styles.fade]: hasBeenSwiped })}>
        <MdArrowRightAlt className={cn(styles.arrow, styles.left)} />
        <span>Swipe</span>
        <MdArrowRightAlt className={styles.arrow} />
      </div>
    </nav>
  );
};
