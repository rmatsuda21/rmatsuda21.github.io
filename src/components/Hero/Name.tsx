import { useEffect, useRef } from "react";

import {
  FINE_POINTER,
  REDUCED_MOTION,
  useMediaQuery,
} from "@/hooks/useMediaQuery";

import { haptic } from "@/utils/haptic";

import styles from "./Hero.module.scss";

const WORDS = ["Reo", "Matsuda"] as const;

// Rubik's weight axis runs from 300 to 900.
const REST_WEIGHT = 800;
const THIN_WEIGHT = 300;
/** Reach of the pointer, as a multiple of the name's font size. */
const REACH = 1.7;
const RIPPLE_MS_PER_PX = 0.55;
const RIPPLE_HOLD_MS = 170;
/** Height of the sticky top bar the name scrolls under. */
const BAR_HEIGHT = 56;

/**
 * The name reacts to the pointer: letters thin out as it gets close and
 * fatten back as it leaves, so a pass of the mouse leaves a dent that
 * travels with it. A click or tap sends a ripple out through the letters.
 * The read-out above shows the lightest weight currently on screen.
 */
export const Name = () => {
  const finePointer = useMediaQuery(FINE_POINTER);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;

    const letters = [...name.querySelectorAll<HTMLElement>("[data-letter]")];
    const rippling = new Set<HTMLElement>();
    const timers = new Set<number>();
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const centre = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    const render = () => {
      frame = 0;
      const reach = parseFloat(getComputedStyle(name).fontSize) * REACH;
      let lightest = REST_WEIGHT;

      for (const letter of letters) {
        let weight = REST_WEIGHT;

        if (rippling.has(letter)) {
          weight = THIN_WEIGHT;
        } else if (pointer) {
          const c = centre(letter);
          const distance = Math.hypot(pointer.x - c.x, pointer.y - c.y);
          const closeness = Math.max(0, 1 - distance / reach);
          weight = Math.round(
            REST_WEIGHT - (REST_WEIGHT - THIN_WEIGHT) * closeness
          );
        }

        letter.style.fontWeight = String(weight);
        lightest = Math.min(lightest, weight);
      }

      if (readoutRef.current) readoutRef.current.textContent = String(lightest);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    // Touch screens have no hover, so scrolling does the job instead: as the
    // name scrolls away, the dent sweeps across it from left to right.
    const handleScroll = () => {
      if (window.matchMedia(FINE_POINTER).matches) return;

      const rect = name.getBoundingClientRect();
      // Finish the sweep while most of the name is still below the top bar.
      const travel = rect.top + window.scrollY - BAR_HEIGHT + rect.height * 0.6;
      const progress = window.scrollY / Math.max(travel, 1);

      if (window.scrollY <= 2 || progress >= 1) {
        pointer = null;
      } else {
        pointer = {
          x: rect.left + rect.width * progress,
          y: rect.top + rect.height / 2,
        };
      }
      schedule();
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };

    // A finger has no hover: forget it once it lifts.
    const handlePointerEnd = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      pointer = null;
      // Fall back to wherever the scroll position puts the dent.
      handleScroll();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (window.matchMedia(REDUCED_MOTION).matches) return;
      haptic();

      for (const letter of letters) {
        const c = centre(letter);
        const distance = Math.hypot(e.clientX - c.x, e.clientY - c.y);

        later(() => {
          rippling.add(letter);
          schedule();
          later(() => {
            rippling.delete(letter);
            schedule();
          }, RIPPLE_HOLD_MS);
        }, distance * RIPPLE_MS_PER_PX);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);
    name.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
      name.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <>
      <div className={styles.meta}>
        <span>Sheet 01 — Subject</span>
        <span className={styles.readout}>
          Wght <span ref={readoutRef}>{REST_WEIGHT}</span> ·{" "}
          {finePointer ? "Hover or click the name" : "Tap it or scroll"}
        </span>
      </div>

      <h1
        ref={nameRef}
        className={styles.name}
        aria-label={WORDS.join(" ")}
        data-measure
      >
        {WORDS.map((word, i) => (
          <span key={word} className={styles.word} aria-hidden="true">
            {[...word].map((letter, j) => (
              <span key={j} data-letter>
                {letter}
              </span>
            ))}
            {i < WORDS.length - 1 && " "}
          </span>
        ))}
      </h1>
    </>
  );
};
