import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import {
  FINE_POINTER,
  REDUCED_MOTION,
  useMediaQuery,
} from "@/hooks/useMediaQuery";

import styles from "./CustomCursor.module.scss";

const TAP_MAX_MOVE = 10;
const TAP_MAX_MS = 350;
const MARK_LIFETIME_MS = 550;
const TICKS = 4;
// Taps on a Lab toy are the toy's own business: it answers them itself, and a
// mark on every poke of a button you are spamming is just noise.
const NO_MARK_SELECTOR = "#lab :is([data-no-canvas-drag], input, button, a)";

/**
 * Touch feedback. A tap marks the sheet like a surveyor marking a point: a
 * thin ring opens, four small ticks drift off along the axes, and the tap's
 * coordinates show briefly beside it. Scrolling, long presses and
 * taps on the Lab's toys leave no mark.
 */
export const TouchLens = () => {
  const finePointer = useMediaQuery(FINE_POINTER);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || finePointer) return;

    const starts = new Map<number, { x: number; y: number; at: number }>();
    const timers = new Set<number>();

    const stamp = (x: number, y: number) => {
      const mark = document.createElement("span");
      mark.className = styles.tapMark;
      mark.style.left = `${x}px`;
      mark.style.top = `${y}px`;
      // Keep the read-out on screen when the tap is near the right edge.
      if (x > window.innerWidth - 120) mark.dataset.flip = "true";

      const ring = document.createElement("i");
      ring.className = styles.tapRing;
      mark.append(ring);

      for (let i = 0; i < TICKS; i++) {
        const tick = document.createElement("i");
        tick.className = styles.tapTick;
        tick.style.setProperty("--angle", `${(360 / TICKS) * i}deg`);
        mark.append(tick);
      }

      const coords = document.createElement("b");
      coords.className = styles.tapCoords;
      coords.textContent = `${Math.round(x)},${Math.round(y)}`;
      mark.append(coords);

      layer.append(mark);
      const id = window.setTimeout(() => {
        timers.delete(id);
        mark.remove();
      }, MARK_LIFETIME_MS);
      timers.add(id);
    };

    const handleDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (e.target instanceof Element && e.target.closest(NO_MARK_SELECTOR)) {
        return;
      }
      starts.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        at: performance.now(),
      });
    };

    const handleUp = (e: PointerEvent) => {
      const start = starts.get(e.pointerId);
      starts.delete(e.pointerId);
      if (!start || window.matchMedia(REDUCED_MOTION).matches) return;

      const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y);
      const held = performance.now() - start.at;
      if (moved <= TAP_MAX_MOVE && held <= TAP_MAX_MS) {
        stamp(e.clientX, e.clientY);
      }
    };

    // The browser took the gesture over (a scroll): not a tap.
    const handleCancel = (e: PointerEvent) => {
      starts.delete(e.pointerId);
    };

    const options = { passive: true } as const;
    document.addEventListener("pointerdown", handleDown, options);
    document.addEventListener("pointerup", handleUp, options);
    document.addEventListener("pointercancel", handleCancel, options);

    return () => {
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleCancel);
      timers.forEach((id) => window.clearTimeout(id));
      layer.replaceChildren();
    };
  }, [finePointer]);

  if (finePointer) return null;

  return createPortal(
    <div ref={layerRef} className={styles.tapLayer} aria-hidden="true" />,
    document.body
  );
};
