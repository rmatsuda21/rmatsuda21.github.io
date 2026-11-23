import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./CustomCursor.module.scss";

const TARGET_SELECTOR = "[data-measure]";
const DWELL_MS = 650;
const HOLD_MS = 450;
const LINGER_MS = 1400;
const MOVE_TOLERANCE = 8;
const EDGE_ROOM = 40;

type Rect = { top: number; left: number; width: number; height: number };

const targetAt = (x: number, y: number) =>
  document.elementFromPoint(x, y)?.closest<HTMLElement>(TARGET_SELECTOR);

/**
 * The measuring lens. Hold the pointer still over anything marked
 * `data-measure` (or press and hold it on a touch screen) and the sheet draws
 * its dimensions, like a callout on a technical drawing.
 */
export const Measure = () => {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    let anchor: { x: number; y: number } | null = null;
    // Set while a press-and-hold reading is up, so lifting the finger does
    // not also count as a tap on whatever was being measured.
    let swallowClick = false;

    const show = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };

    const hide = () => {
      window.clearTimeout(timer);
      anchor = null;
      setRect(null);
    };

    const movedFar = (x: number, y: number) =>
      !anchor ||
      Math.hypot(x - anchor.x, y - anchor.y) > MOVE_TOLERANCE;

    // Mouse: dwell. Pointer events, not mouse events: a tap on a touch screen
    // also fires compatibility mouse events, which would otherwise start a
    // dwell and leave a reading stuck on screen.
    const handleMouseMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      const { clientX: x, clientY: y } = e;
      if (!movedFar(x, y)) return;

      hide();
      if (e.buttons !== 0) return;

      anchor = { x, y };
      timer = window.setTimeout(() => {
        const el = targetAt(x, y);
        if (el) show(el);
      }, DWELL_MS);
    };

    // Touch: press and hold.
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        hide();
        return;
      }
      swallowClick = false;
      const el = targetAt(e.clientX, e.clientY);
      if (!el) return;

      hide();
      anchor = { x: e.clientX, y: e.clientY };
      timer = window.setTimeout(() => {
        swallowClick = true;
        show(el);
      }, HOLD_MS);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (movedFar(e.clientX, e.clientY)) hide();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      window.clearTimeout(timer);
      // Leave the reading up briefly after the finger lifts.
      timer = window.setTimeout(hide, LINGER_MS);
    };

    // Android opens a context menu on long press; that is our gesture here.
    let lastPointerType = "mouse";
    const notePointerType = (e: PointerEvent) => {
      lastPointerType = e.pointerType;
    };
    const handleContextMenu = (e: MouseEvent) => {
      if (lastPointerType === "mouse") return;
      if ((e.target as Element | null)?.closest(TARGET_SELECTOR)) {
        e.preventDefault();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!swallowClick) return;
      swallowClick = false;
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("pointerdown", notePointerType, true);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("pointermove", handleMouseMove);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", hide);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", notePointerType, true);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", hide);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, []);

  if (!rect) return null;

  return createPortal(
    <div
      className={styles.measure}
      style={rect}
      aria-hidden="true"
      data-inside-x={rect.left < EDGE_ROOM ? "" : undefined}
      data-inside-y={rect.top < EDGE_ROOM ? "" : undefined}
    >
      <span className={`${styles.dimension} ${styles.horizontal}`} />
      <span className={`${styles.dimension} ${styles.vertical}`} />
      <span className={`${styles.label} ${styles.widthLabel}`}>
        {Math.round(rect.width)} px
      </span>
      <span className={`${styles.label} ${styles.heightLabel}`}>
        {Math.round(rect.height)} px
      </span>
    </div>,
    document.body
  );
};
