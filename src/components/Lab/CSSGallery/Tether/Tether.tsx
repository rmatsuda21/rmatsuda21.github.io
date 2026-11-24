import { motion, useMotionValue, useTransform } from "motion/react";

import styles from "./Tether.module.scss";

const REST = 64;

/** A ball on an elastic cord: pull it anywhere and let go. */
export const Tether = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cordY = useTransform(y, (v) => v + REST);

  return (
    <div className={styles.tether} data-no-canvas-drag>
      <svg className={styles.cord} aria-hidden="true">
        <motion.line x1={0} y1={0} x2={x} y2={cordY} />
      </svg>
      <i className={styles.pin} />
      <motion.div
        className={styles.ball}
        style={{ x, y }}
        drag
        dragSnapToOrigin
        dragElastic={1}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 7 }}
        whileDrag={{ scale: 0.9 }}
      />
    </div>
  );
};
