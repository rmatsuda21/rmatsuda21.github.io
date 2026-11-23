import { useEffect, useRef, useState } from "react";

import { Scramble } from "@/components/Scramble/Scramble";

import { haptic } from "@/utils/haptic";

import styles from "./StackRuler.module.scss";

// Add or reorder freely: the ruler lays itself out from this list.
const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "GraphQL",
  "Sass",
  "Motion",
  "Vite",
  "Jest",
  "Playwright",
  "Django",
  "Python",
] as const;

/** Minor graduations between one technology and the next. */
const MINOR_TICKS = 3;
/** How far the pointer's pull reaches along the scale, in pixels. */
const REACH = 70;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The stack as a ruler. Each long graduation is a technology; run the pointer
 * (or a finger) along the scale and the ticks rise under it like a wave while
 * the read-out decodes the one you are over.
 */
export const StackRuler = () => {
  const [active, setActive] = useState(0);
  const scaleRef = useRef<HTMLDivElement>(null);

  // A tick under the thumb each time the read-out moves to the next one.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) haptic(6);
    mounted.current = true;
  }, [active]);

  useEffect(() => {
    const scale = scaleRef.current;
    if (!scale) return;

    const ticks = [...scale.querySelectorAll<HTMLElement>("[data-tick]")];
    let pointerX: number | null = null;
    let frame = 0;

    const render = () => {
      frame = 0;
      for (const tick of ticks) {
        let lift = 0;
        if (pointerX !== null) {
          const rect = tick.getBoundingClientRect();
          const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
          lift = Math.max(0, 1 - distance / REACH);
        }
        tick.style.setProperty("--lift", lift.toFixed(3));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const handleMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      schedule();

      const rect = scale.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const index = Math.floor(ratio * STACK.length);
      setActive(Math.max(0, Math.min(STACK.length - 1, index)));
    };

    const handleLeave = () => {
      pointerX = null;
      schedule();
    };

    scale.addEventListener("pointermove", handleMove);
    scale.addEventListener("pointerdown", handleMove);
    scale.addEventListener("pointerleave", handleLeave);
    scale.addEventListener("pointercancel", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      scale.removeEventListener("pointermove", handleMove);
      scale.removeEventListener("pointerdown", handleMove);
      scale.removeEventListener("pointerleave", handleLeave);
      scale.removeEventListener("pointercancel", handleLeave);
    };
  }, []);

  return (
    <div className={styles.ruler}>
      <div className={styles.readout} aria-live="polite">
        {/* Re-keyed so the name decodes afresh each time it changes. */}
        <Scramble
          key={active}
          text={STACK[active]}
          // Quicker than the default, to keep up with a sweep along the scale.
          lead={60}
          perChar={30}
          className={styles.name}
        />
        <span className={styles.count} aria-hidden="true">
          {pad(active + 1)} / {pad(STACK.length)}
        </span>
      </div>

      <div
        className={styles.scale}
        ref={scaleRef}
        style={
          {
            "--count": STACK.length,
            "--slots": MINOR_TICKS + 1,
          } as React.CSSProperties
        }
      >
        {STACK.map((tech, i) => (
          <button
            key={tech}
            type="button"
            className={styles.segment}
            aria-label={tech}
            aria-pressed={i === active}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <i data-tick className={styles.major} />
            {Array.from({ length: MINOR_TICKS }, (_, j) => (
              <i key={j} data-tick className={styles.minor} />
            ))}
          </button>
        ))}
        <i className={styles.end} aria-hidden="true" />
      </div>
    </div>
  );
};
