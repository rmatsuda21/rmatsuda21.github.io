import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { FINE_POINTER, useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./CustomCursor.module.scss";

const ROW_SELECTOR = '[data-lens="row"]';

/**
 * The inverting lens. It always follows the pointer 1:1. When it enters
 * anything marked `data-lens="row"`, it tells the row where it came in, and
 * the row floods to the opposite polarity outward from that point (and drains
 * back toward wherever the lens leaves). See the `flood-row` mixin.
 */
export const CustomCursor = () => {
  const finePointer = useMediaQuery(FINE_POINTER);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !finePointer) return;

    let x = -100;
    let y = -100;

    let currentRow: HTMLElement | null = null;

    const markRow = (row: HTMLElement) => {
      const rect = row.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      // Just big enough to reach the farthest corner, so the flood is
      // visible for the whole animation instead of only part of it.
      const reach = Math.hypot(
        Math.max(px, rect.width - px),
        Math.max(py, rect.height - py)
      );
      row.style.setProperty("--flood-x", `${px}px`);
      row.style.setProperty("--flood-y", `${py}px`);
      row.style.setProperty("--flood-size", `${Math.ceil(reach * 2) + 4}px`);
    };

    const place = () => {
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;

      const row =
        document.elementFromPoint(x, y)?.closest<HTMLElement>(ROW_SELECTOR) ??
        null;
      if (row === currentRow) return;

      // The row being left drains toward the exit point; the new one floods
      // from the entry point.
      if (currentRow) markRow(currentRow);
      if (row) markRow(row);
      currentRow = row;
    };

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      cursor.dataset.visible = "true";
      place();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) cursor.dataset.pressed = "true";
    };

    const handleMouseUp = () => {
      delete cursor.dataset.pressed;
    };

    const handleLeave = () => {
      delete cursor.dataset.visible;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    // Rows move under a still pointer when the page scrolls.
    window.addEventListener("scroll", place, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("scroll", place);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return createPortal(
    <div ref={cursorRef} className={styles.body} aria-hidden="true" />,
    document.body
  );
};
