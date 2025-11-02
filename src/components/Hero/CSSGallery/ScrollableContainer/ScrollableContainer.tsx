import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SIZE_MULTIPLIER = 1.5;

export const ScrollableContainer = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [constraints, setConstraints] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) {
      return;
    }

    const resize = () => {
      const contentSize = container.offsetWidth * SIZE_MULTIPLIER;
      content.style.width = contentSize + "px";
      content.style.height = contentSize + "px";

      const containerRect = container.getBoundingClientRect();

      const offset = {
        x: (containerRect.width - contentSize) / 2,
        y: (containerRect.height - contentSize) / 2,
      };

      const constraints = {
        left: containerRect.width - contentSize,
        right: 0,
        top: containerRect.height - contentSize,
        bottom: 0,
      };

      setOffset(offset);
      setConstraints(constraints);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        ref={contentRef}
        drag
        dragElastic={0.2}
        style={{ x: offset.x, y: offset.y, position: "relative" }}
        dragConstraints={constraints}
      >
        {children}
      </motion.div>
    </div>
  );
};
