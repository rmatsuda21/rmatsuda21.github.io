import { useEffect, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./BubbleWrap.module.scss";

const COUNT = 16;
const REFILL_DELAY_MS = 900;

const fresh = () => Array.from({ length: COUNT }, () => false);

/** Bubble wrap: tap or drag across it to pop. A fresh sheet follows. */
export const BubbleWrap = () => {
  const [popped, setPopped] = useState(fresh);
  const [sheet, setSheet] = useState(0);

  const done = popped.every(Boolean);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => {
      setPopped(fresh());
      setSheet((n) => n + 1);
    }, REFILL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [done]);

  const pop = (e: React.PointerEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const raw = el instanceof HTMLElement ? el.dataset.bubble : undefined;
    if (raw === undefined) return;

    const index = Number(raw);
    if (popped[index]) return;
    haptic(12);
    setPopped((current) => {
      if (current[index]) return current;
      const next = current.slice();
      next[index] = true;
      return next;
    });
  };

  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="Bubble wrap to pop"
      data-no-canvas-drag
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        pop(e);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) pop(e);
      }}
    >
      {popped.map((isPopped, i) => (
        <i
          // A new sheet remounts every bubble, so they all grow back in.
          key={`${sheet}-${i}`}
          data-bubble={i}
          data-popped={isPopped || undefined}
          data-regrown={sheet > 0 || undefined}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
