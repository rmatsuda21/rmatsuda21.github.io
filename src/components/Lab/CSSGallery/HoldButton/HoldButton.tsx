import { useEffect, useState } from "react";

import { haptic } from "@/utils/haptic";

import styles from "./HoldButton.module.scss";

const RESET_DELAY_MS = 1300;

type Phase = "idle" | "holding" | "done";

/** Hold it down to fill the ring. Let go early and it drains away. */
export const HoldButton = () => {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (phase !== "done") return;
    const id = window.setTimeout(() => setPhase("idle"), RESET_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const start = () => setPhase((p) => (p === "idle" ? "holding" : p));
  const cancel = () => setPhase((p) => (p === "holding" ? "idle" : p));

  return (
    <button
      type="button"
      className={styles.hold}
      data-phase={phase}
      aria-label={phase === "done" ? "Done" : "Hold to confirm"}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) start();
      }}
      onKeyUp={cancel}
      onBlur={cancel}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <circle className={styles.track} cx="40" cy="40" r="36" />
        <circle
          className={styles.ring}
          cx="40"
          cy="40"
          r="36"
          pathLength={1}
          onTransitionEnd={() => {
            // The ring only finishes filling while still held.
            setPhase((p) => {
              if (p !== "holding") return p;
              haptic(20);
              return "done";
            });
          }}
        />
      </svg>
      <span>{phase === "done" ? "OK!" : "Hold"}</span>
    </button>
  );
};
