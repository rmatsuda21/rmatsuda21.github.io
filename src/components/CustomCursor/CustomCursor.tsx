import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { createPortal } from "react-dom";

import styles from "./CustomCursor.module.scss";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [leftClick, setLeftClick] = useState(false);

  useEffect(() => {
    if (cursorRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        cursorRef.current!.style.left = `${e.clientX}px`;
        cursorRef.current!.style.top = `${e.clientY}px`;
      };

      const handleMouseDown = (e: MouseEvent) => {
        switch (e.button) {
          case 0:
            setLeftClick(true);
            break;
        }
      };

      const handleMouseUp = () => {
        setLeftClick(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  return createPortal(
    <div
      ref={cursorRef}
      className={cn(styles.body, { [styles.leftClick]: leftClick })}
    />,
    document.body
  );
};
