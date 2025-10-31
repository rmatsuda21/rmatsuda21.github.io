import { useEffect, useState } from "react";
import { animate } from "motion";
import {
  motion,
  useMotionValue,
  type PanInfo,
  AnimatePresence,
} from "motion/react";
import cn from "classnames";

import { Icons, type IconKeys } from "@/constants/Icons";

import styles from "./TechCarousel.module.scss";

type Props = {
  techStack: IconKeys[];
  className?: string;
};

const ITEM_WIDTH = 35;
const ITEM_GAP = 20;

const getNewIndex = ({
  lastActiveIndex,
  offset,
  techStackLength,
}: {
  lastActiveIndex: number;
  offset: number;
  techStackLength: number;
}) => {
  const offsetIndex = Math.round(-offset / (ITEM_WIDTH + ITEM_GAP));
  const newIndex = lastActiveIndex + offsetIndex;
  return Math.max(0, Math.min(techStackLength - 1, newIndex));
};

const TechCarousel = ({ techStack, className }: Props) => {
  const [index, setIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const newIndex = getNewIndex({
      lastActiveIndex,
      offset,
      techStackLength: techStack.length,
    });
    setLastActiveIndex(newIndex);
    setIndex(newIndex);
  };

  const handleDrag = (_: any, info: PanInfo) => {
    setIsDragging(true);
    const offset = info.offset.x;
    const newIndex = getNewIndex({
      lastActiveIndex,
      offset,
      techStackLength: techStack.length,
    });
    setIndex(newIndex);
  };

  useEffect(() => {
    if (!isDragging) {
      animate(x, -lastActiveIndex * (ITEM_WIDTH + ITEM_GAP), {
        duration: 0.2,
        ease: "easeInOut",
      });
    }
  }, [x, isDragging, lastActiveIndex]);

  return (
    <div
      className={cn(styles.container, className)}
      style={
        {
          "--item-width": `${ITEM_WIDTH}px`,
          "--item-gap": `${ITEM_GAP}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.carousel}
          drag="x"
          style={{ x }}
          dragMomentum={false}
          dragConstraints={{
            left: -(techStack.length - 1) * (ITEM_WIDTH + ITEM_GAP),
            right: 0,
          }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
        >
          {techStack.map((tech, i) => (
            <div
              key={tech}
              className={cn({ [styles.active]: index === i })}
              style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
              onClick={() => {
                setIndex(i);
                setLastActiveIndex(i);
              }}
            >
              {Icons[tech].icon}
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.nameList}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={techStack[index]}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.4, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            {Icons[techStack[index]].name}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechCarousel;
