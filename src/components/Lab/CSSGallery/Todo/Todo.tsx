import { useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./Todo.module.scss";

const ITEMS = ["Drag the canvas", "Poke everything", "Say howdy"];

/** A checklist: the tick draws itself and the line strikes through. */
export const Todo = () => {
  const [done, setDone] = useState([true, false, false]);

  return (
    <ul className={styles.todo} data-no-canvas-drag>
      {ITEMS.map((item, i) => (
        <li key={item}>
          <label>
            <input
              type="checkbox"
              checked={done[i]}
              onChange={() => {
                haptic();
                setDone((current) =>
                  current.map((value, j) => (j === i ? !value : value))
                );
              }}
            />
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4.5 10.5 8.5 14.5 15.5 6" pathLength={1} />
            </svg>
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
