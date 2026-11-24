import { useEffect, useRef } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./Cradle.module.scss";

const BALLS = 5;
// Degrees.
const KICK = 26;
const MAX_SWING = 44;
const STOP_BELOW = 0.6;
// Seconds for one full left-right-left.
const PERIOD = 0.95;
// Seconds for the swing to fall to about a third.
const SETTLE = 3.2;

/** Newton's cradle. Tap it to lift the end ball; tap again for more. */
export const Cradle = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const state = useRef({ swing: 0, phase: 0, frame: 0, last: 0 });

  const render = () => {
    const s = state.current;
    // Negative while the left ball is out, positive while the right one is.
    const angle = -s.swing * Math.cos(s.phase);
    ref.current?.style.setProperty("--left", `${-Math.min(angle, 0)}deg`);
    ref.current?.style.setProperty("--right", `${-Math.max(angle, 0)}deg`);
  };

  const tick = (now: number) => {
    const s = state.current;
    const dt = Math.min(0.05, (now - s.last) / 1000);
    s.last = now;
    s.phase += (dt / PERIOD) * Math.PI * 2;
    s.swing *= Math.exp(-dt / SETTLE);
    if (s.swing < STOP_BELOW) s.swing = 0;
    render();
    s.frame = s.swing === 0 ? 0 : requestAnimationFrame(tick);
  };

  useEffect(() => {
    const s = state.current;
    return () => cancelAnimationFrame(s.frame);
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={styles.cradle}
      aria-label="Newton's cradle. Swing"
      onClick={() => {
        const s = state.current;
        haptic();
        // From rest it starts with the left ball lifted, as if let go.
        if (s.swing === 0) s.phase = 0;
        s.swing = Math.min(MAX_SWING, s.swing + KICK);
        if (!s.frame) {
          s.last = performance.now();
          s.frame = requestAnimationFrame(tick);
        }
      }}
    >
      {Array.from({ length: BALLS }, (_, i) => (
        <i key={i} />
      ))}
    </button>
  );
};
