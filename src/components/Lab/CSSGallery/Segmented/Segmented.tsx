import { useId, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./Segmented.module.scss";

const OPTIONS = [
  { label: "Thin", weight: 300 },
  { label: "Regular", weight: 500 },
  { label: "Bold", weight: 800 },
] as const;

/** A segmented control whose options are set in the weight they name. */
export const Segmented = () => {
  const name = useId();
  const [index, setIndex] = useState(1);

  return (
    <div
      className={styles.group}
      role="radiogroup"
      aria-label="Weight"
      style={{ "--index": index } as React.CSSProperties}
      data-no-canvas-drag
    >
      {OPTIONS.map((option, i) => (
        <label key={option.label} className={styles.option}>
          <input
            type="radio"
            name={name}
            checked={i === index}
            onChange={() => {
              haptic();
              setIndex(i);
            }}
          />
          <span style={{ fontWeight: option.weight }}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
