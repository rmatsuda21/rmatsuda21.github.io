import { useEffect, useRef } from "react";

import styles from "./Eyes.module.scss";

const REACH = 9;

/** A pair of eyes that watch the pointer, or the last place a finger was. */
export const Eyes = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pupils = Array.from(root.querySelectorAll<HTMLElement>("[data-pupil]"));

    const look = (e: PointerEvent) => {
      for (const pupil of pupils) {
        const eye = pupil.parentElement;
        if (!eye) continue;
        const rect = eye.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        // Ease in over the first stretch, so a nearby pointer is not a snap.
        const pull = Math.min(1, distance / 80) * REACH;
        pupil.style.transform = `translate(${(dx / distance) * pull}px, ${
          (dy / distance) * pull
        }px)`;
      }
    };

    const options = { passive: true } as const;
    window.addEventListener("pointermove", look, options);
    window.addEventListener("pointerdown", look, options);
    return () => {
      window.removeEventListener("pointermove", look);
      window.removeEventListener("pointerdown", look);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.eyes} aria-hidden="true">
      <span className={styles.eye}>
        <i data-pupil />
      </span>
      <span className={styles.eye}>
        <i data-pupil />
      </span>
    </div>
  );
};
