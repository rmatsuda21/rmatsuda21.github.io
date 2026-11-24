import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { haptic } from "@/utils/haptic";

import styles from "./Toast.module.scss";

const DISMISS_AFTER_MS = 1500;

/** A save button whose toast counts up instead of piling up. */
export const Toast = () => {
  // How many saves the toast on screen stands for; 0 hides it.
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    const id = window.setTimeout(() => setCount(0), DISMISS_AFTER_MS);
    return () => window.clearTimeout(id);
  }, [count]);

  return (
    <div className={styles.toaster}>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            className={styles.toast}
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 520, damping: 28 }}
          >
            Saved
            {count > 1 && (
              // Re-keyed so the tally bumps on every extra save.
              <span key={count} className={styles.tally}>
                ×{count}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          haptic();
          setCount((n) => Math.min(99, n + 1));
        }}
      >
        <span>Save</span>
      </button>
    </div>
  );
};
