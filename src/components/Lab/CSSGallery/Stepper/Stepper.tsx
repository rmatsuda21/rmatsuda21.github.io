import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { haptic } from "@/utils/haptic";

import styles from "./Stepper.module.scss";

const MIN = 0;
const MAX = 99;

const variants = {
  enter: (dir: number) => ({ y: `${dir * 100}%` }),
  centre: { y: "0%" },
  exit: (dir: number) => ({ y: `${dir * -100}%` }),
};

/** A counter whose digits roll up or down with the direction of the step. */
export const Stepper = () => {
  const [{ value, dir }, setState] = useState({ value: 7, dir: 1 });

  const step = (by: number) => {
    haptic();
    setState((current) => ({
      value: Math.max(MIN, Math.min(MAX, current.value + by)),
      dir: by,
    }));
  };

  const digits = String(value).padStart(2, "0").split("");

  return (
    <div className={styles.stepper} role="group" aria-label="Counter">
      <button type="button" aria-label="Decrease" onClick={() => step(-1)}>
        <span>−</span>
      </button>
      <span className={styles.value} aria-live="polite" aria-label={`${value}`}>
        {digits.map((digit, place) => (
          <span key={place} className={styles.digit} aria-hidden="true">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.span
                key={digit}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="centre"
                exit="exit"
                transition={{ type: "spring", stiffness: 520, damping: 30 }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </span>
      <button type="button" aria-label="Increase" onClick={() => step(1)}>
        <span>+</span>
      </button>
    </div>
  );
};
