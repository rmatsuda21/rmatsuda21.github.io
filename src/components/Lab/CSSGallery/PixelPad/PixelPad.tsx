import { useRef, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./PixelPad.module.scss";

const SMILE = [
  "..####..",
  ".#....#.",
  "#.#..#.#",
  "#......#",
  "#.#..#.#",
  "#..##..#",
  ".#....#.",
  "..####..",
]
  .join("")
  .split("")
  .map((c) => c === "#");

/** A small pad to draw on: drag across it to paint, start on ink to erase. */
export const PixelPad = () => {
  const [cells, setCells] = useState(SMILE);
  // What the current stroke writes, set by the first cell it touches.
  const ink = useRef<boolean | null>(null);

  const paint = (e: React.PointerEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const raw = el instanceof HTMLElement ? el.dataset.cell : undefined;
    if (raw === undefined) return;

    const index = Number(raw);
    setCells((current) => {
      if (ink.current === null) ink.current = !current[index];
      if (current[index] === ink.current) return current;
      haptic();
      const next = current.slice();
      next[index] = ink.current;
      return next;
    });
  };

  const empty = cells.every((on) => !on);

  return (
    <div className={styles.pad} data-no-canvas-drag>
      <div
        className={styles.grid}
        role="img"
        aria-label="A pixel pad to draw on"
        onPointerDown={(e) => {
          ink.current = null;
          e.currentTarget.setPointerCapture(e.pointerId);
          paint(e);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) paint(e);
        }}
      >
        {cells.map((on, i) => (
          <i key={i} data-cell={i} data-on={on || undefined} />
        ))}
      </div>
      <button
        type="button"
        className={styles.reset}
        onClick={() => {
          haptic();
          setCells(empty ? SMILE : cells.map(() => false));
        }}
      >
        {empty ? "Smile" : "Clear"}
      </button>
    </div>
  );
};
