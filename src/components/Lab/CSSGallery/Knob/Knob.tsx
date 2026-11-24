import { useRef, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./Knob.module.scss";

const MAX = 11;
const SWEEP = 135;

const angleOf = (value: number) => -SWEEP + (value / MAX) * SWEEP * 2;

/** A dial you turn by dragging round it. It goes to eleven. */
export const Knob = () => {
  const [value, setValue] = useState(4);
  const dialRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (next: number) => {
    const clamped = Math.max(0, Math.min(MAX, next));
    setValue((current) => {
      if (current !== clamped) haptic();
      return clamped;
    });
  };

  const turnTo = (e: React.PointerEvent) => {
    const dial = dialRef.current;
    if (!dial) return;

    const rect = dial.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    // Too close to the centre for the angle to mean anything.
    if (Math.hypot(dx, dy) < 6) return;

    // 0° is straight up, clockwise is positive. The gap at the bottom snaps
    // to whichever end is nearer.
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const clamped = Math.max(-SWEEP, Math.min(SWEEP, angle));
    update(Math.round(((clamped + SWEEP) / (SWEEP * 2)) * MAX));
  };

  return (
    <div className={styles.knob} data-no-canvas-drag>
      <div
        ref={dialRef}
        className={styles.dial}
        role="slider"
        tabIndex={0}
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={MAX}
        aria-valuenow={value}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          turnTo(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) turnTo(e);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            update(value + 1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            update(value - 1);
          }
        }}
      >
        {Array.from({ length: MAX + 1 }, (_, i) => (
          <i
            key={i}
            className={styles.tick}
            data-lit={i <= value || undefined}
            style={{ "--angle": `${angleOf(i)}deg` } as React.CSSProperties}
          />
        ))}
        <div
          className={styles.cap}
          style={{ "--angle": `${angleOf(value)}deg` } as React.CSSProperties}
        />
      </div>
      <span className={styles.value} aria-hidden="true">
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
};
