import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { haptic } from "@/utils/haptic";

import styles from "./Hero.module.scss";

const POKES_UNTIL_REST = 6;
const REST_MS = 2600;

/**
 * Jigglypuff puffs up a little with every poke, then falls asleep.
 */
export const Poke = () => {
  const [pokes, setPokes] = useState(0);
  const resting = pokes >= POKES_UNTIL_REST;

  useEffect(() => {
    if (!resting) return;
    const id = window.setTimeout(() => setPokes(0), REST_MS);
    return () => window.clearTimeout(id);
  }, [resting]);

  const status = resting ? "Zzz" : pokes > 0 ? `Poked ×${pokes}` : "Poke me";

  return (
    <span className={styles.poke}>
      <motion.button
        type="button"
        className={styles.puff}
        disabled={resting}
        onClick={() => {
          // A longer buzz for the poke that sends it to sleep.
          haptic(pokes + 1 >= POKES_UNTIL_REST ? 40 : 10);
          setPokes((n) => n + 1);
        }}
        animate={
          resting
            ? { scale: 1, rotate: 90 }
            : { scale: 1 + pokes * 0.07, rotate: pokes % 2 ? -4 : pokes ? 4 : 0 }
        }
        transition={{ type: "spring", stiffness: 500, damping: 9 }}
        whileTap={{ scale: 0.9 }}
      >
        Jigglypuff (SSBU)
      </motion.button>
      <span className={styles.pokeStatus} aria-live="polite">
        {status}
      </span>
    </span>
  );
};
