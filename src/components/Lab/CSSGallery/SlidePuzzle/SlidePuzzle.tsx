import { useEffect, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./SlidePuzzle.module.scss";

const SIDE = 3;
const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const RESHUFFLE_DELAY_MS = 1400;

const isSolved = (board: readonly number[]) =>
  board.every((tile, i) => tile === SOLVED[i]);

/** Slides every tile between `from` and the gap one place towards the gap. */
const slide = (board: readonly number[], from: number) => {
  const gap = board.indexOf(0);
  const sameRow = Math.floor(from / SIDE) === Math.floor(gap / SIDE);
  const sameColumn = from % SIDE === gap % SIDE;
  if (from === gap || (!sameRow && !sameColumn)) return null;

  const step = (sameRow ? 1 : SIDE) * (from < gap ? -1 : 1);
  const next = board.slice();
  for (let i = gap; i !== from; i += step) next[i] = next[i + step];
  next[from] = 0;
  return next;
};

// Shuffled by sliding, so it can always be solved.
const shuffled = () => {
  let board: number[] = SOLVED;
  let moves = 0;
  while (moves < 40 || isSolved(board)) {
    const next = slide(board, Math.floor(Math.random() * SIDE * SIDE));
    if (next) {
      board = next;
      moves += 1;
    }
  }
  return board;
};

/** The eight puzzle. Tap a tile in line with the gap to slide it over. */
export const SlidePuzzle = () => {
  const [board, setBoard] = useState(shuffled);
  const solved = isSolved(board);

  useEffect(() => {
    if (!solved) return;
    const id = window.setTimeout(
      () => setBoard(shuffled()),
      RESHUFFLE_DELAY_MS
    );
    return () => window.clearTimeout(id);
  }, [solved]);

  return (
    <div
      className={styles.puzzle}
      role="group"
      aria-label="Sliding puzzle"
      data-solved={solved || undefined}
    >
      {SOLVED.slice(0, -1).map((tile) => {
        const at = board.indexOf(tile);
        return (
          <button
            key={tile}
            type="button"
            aria-label={`Tile ${tile}`}
            style={
              {
                "--col": at % SIDE,
                "--row": Math.floor(at / SIDE),
              } as React.CSSProperties
            }
            onClick={() => {
              if (solved) return;
              const next = slide(board, at);
              if (!next) return;
              haptic();
              setBoard(next);
            }}
          >
            {tile}
          </button>
        );
      })}
    </div>
  );
};
