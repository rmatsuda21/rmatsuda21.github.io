import { useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./Dice.module.scss";

// Which of the nine cells carry a pip for each face.
const FACES: Record<number, readonly number[]> = {
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

/** A die that tumbles to a new face each time it is tapped. */
export const Dice = () => {
  const [roll, setRoll] = useState({ face: 5, count: 0 });

  return (
    <button
      type="button"
      className={styles.dice}
      aria-label={`Dice showing ${roll.face}. Roll`}
      onClick={() => {
        haptic();
        setRoll((current) => {
          // Never the same face twice, so every tap visibly changes it.
          const step = 1 + Math.floor(Math.random() * 5);
          return {
            face: ((current.face - 1 + step) % 6) + 1,
            count: current.count + 1,
          };
        });
      }}
    >
      {/* Re-keyed on every roll so the tumble restarts, even mid-tumble. */}
      <span
        key={roll.count}
        className={styles.face}
        data-rolled={roll.count > 0 || undefined}
        data-flip={roll.count % 2 === 0 || undefined}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} data-pip={FACES[roll.face].includes(i) || undefined} />
        ))}
      </span>
    </button>
  );
};
