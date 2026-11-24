import { useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./Keycap.module.scss";

/** A chunky key that counts how often it has been pressed. */
export const Keycap = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      className={styles.key}
      aria-label={`Pressed ${count} times. Press again`}
      onClick={() => {
        haptic();
        setCount((c) => (c + 1) % 1000);
      }}
    >
      <span className={styles.cap}>{String(count).padStart(3, "0")}</span>
    </button>
  );
};
