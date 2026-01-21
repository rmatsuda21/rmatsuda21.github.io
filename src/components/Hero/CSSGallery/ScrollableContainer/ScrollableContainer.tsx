import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useVelocity } from "motion/react";
import { ScrollContext } from "./ScrollContext";

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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);

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

      const newOffset = {
        x: (containerRect.width - contentSize) / 2,
        y: (containerRect.height - contentSize) / 2,
      };

      const newConstraints = {
        left: containerRect.width - contentSize,
        right: 0,
        top: containerRect.height - contentSize,
        bottom: 0,
      };

      setOffset(newOffset);
      setConstraints(newConstraints);
      x.set(newOffset.x);
      y.set(newOffset.y);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [x, y]);

  return (
    <ScrollContext.Provider value={{ x, y, velocityX, velocityY }}>
      <div ref={containerRef} className={className}>
        <motion.div
          ref={contentRef}
          drag
          dragElastic={0.2}
          style={{ x, y, position: "relative" }}
          dragConstraints={constraints}
          onDragStart={() => {
            x.set(x.get());
            y.set(y.get());
          }}
          initial={{ x: offset.x, y: offset.y }}
        >
          {children}
        </motion.div>
      </div>
    </ScrollContext.Provider>
  );
};
