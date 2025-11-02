import { useEffect, useRef } from "react";
import cn from "classnames";

import styles from "./RandomText.module.scss";

const INTERVAL = 30;
const CYCLE_COUNT = 8;
const rs =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&1234567890";

const getRandomString = (len: number) => {
  let ret = "";
  for (let i = 0; i < len; i++) {
    const r = Math.floor(Math.random() * rs.length);
    ret += rs[r];
  }
  return ret;
};

type Props = {
  className?: string;
};

export const RandomText = ({ className }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!textRef.current) {
      return;
    }

    const text = textRef.current;
    const originalText = text.innerHTML;
    const textLength = originalText.length;

    let indx = 0,
      count = 0,
      id: number,
      direction = 1;

    const runRandomText = () => {
      id = setInterval(() => {
        count++;
        text.innerHTML =
          originalText.slice(0, indx) + getRandomString(textLength - indx);

        if (count > 0 && count % CYCLE_COUNT === 0) {
          indx += direction;
          count = 0;

          if (indx > textLength || indx < 0) {
            direction = direction * -1;
            indx = Math.max(0, Math.min(indx, textLength));

            clearInterval(id);
            setTimeout(() => {
              runRandomText();
            }, 500);
          }
        }
      }, INTERVAL);
    };

    runRandomText();
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={textRef} className={cn(styles.text, className)}>
      Hello World!
    </div>
  );
};
