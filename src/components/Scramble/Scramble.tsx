import { useCallback, useEffect, useRef } from "react";

import { REDUCED_MOTION } from "@/hooks/useMediaQuery";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&$@+";
const TICK_MS = 40;
const LEAD_MS = 240;
const PER_CHAR_MS = 80;

type Props = {
  text: string;
  /** Milliseconds to wait before the first character locks in. */
  delay?: number;
  /** Milliseconds before the first character locks in. */
  lead?: number;
  /** Milliseconds between one character locking in and the next. */
  perChar?: number;
  className?: string;
};

/**
 * Decodes `text` out of noise, one character at a time. Runs on mount and
 * again whenever the pointer enters it.
 */
export const Scramble = ({
  text,
  delay = 0,
  lead = LEAD_MS,
  perChar = PER_CHAR_MS,
  className,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const run = useCallback(
    (startDelay: number) => {
      const el = ref.current;
      if (!el) return;

      window.clearInterval(timer.current);

      if (window.matchMedia(REDUCED_MOTION).matches) {
        el.textContent = text;
        return;
      }

      const start = performance.now() + startDelay;

      timer.current = window.setInterval(() => {
        const elapsed = performance.now() - start;
        let out = "";
        let done = true;

        for (let i = 0; i < text.length; i++) {
          const locked = elapsed >= lead + i * perChar;
          if (locked || text[i] === " ") {
            out += text[i];
          } else {
            done = false;
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        el.textContent = out;
        if (done) window.clearInterval(timer.current);
      }, TICK_MS);
    },
    [text, lead, perChar]
  );

  useEffect(() => {
    run(delay);
    return () => window.clearInterval(timer.current);
  }, [run, delay]);

  return (
    <span className={className} onPointerEnter={() => run(0)}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="srOnly">{text}</span>
    </span>
  );
};
