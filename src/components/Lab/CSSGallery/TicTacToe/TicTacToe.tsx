import { useEffect, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./TicTacToe.module.scss";

const RESET_DELAY_MS = 1300;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

type Mark = "x" | "o" | null;

const empty = (): Mark[] => Array.from({ length: 9 }, () => null);

/** Noughts and crosses for two thumbs. Clears itself when a game ends. */
export const TicTacToe = () => {
  const [cells, setCells] = useState(empty);

  const line = LINES.find(
    ([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
  );
  const full = cells.every(Boolean);
  const over = Boolean(line) || full;

  useEffect(() => {
    if (!over) return;
    const id = window.setTimeout(() => setCells(empty()), RESET_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [over]);

  const play = (index: number) => {
    haptic();
    // Any tap on a finished board starts the next game straight away.
    if (over) {
      setCells(empty());
      return;
    }
    if (cells[index]) return;
    const next = cells.slice();
    next[index] = cells.filter(Boolean).length % 2 === 0 ? "x" : "o";
    setCells(next);
  };

  return (
    <div
      className={styles.board}
      role="group"
      aria-label="Noughts and crosses"
      data-draw={(full && !line) || undefined}
    >
      {cells.map((mark, i) => (
        <button
          key={i}
          type="button"
          data-mark={mark ?? undefined}
          data-win={line?.some((n) => n === i) || undefined}
          aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}, ${
            mark ?? "empty"
          }`}
          onClick={() => play(i)}
        >
          <i />
        </button>
      ))}
    </div>
  );
};
