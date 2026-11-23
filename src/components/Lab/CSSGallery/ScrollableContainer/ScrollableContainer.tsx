import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useVelocity,
} from "motion/react";
import { ScrollContext } from "./ScrollContext";

// The canvas is larger than its window so there is room to drag.
const WIDTH_MULTIPLIER = 1.3;
const HEIGHT_MULTIPLIER = 1.35;

// Toys with their own pointer handling (the slider, the toggles) opt out, so
// using one does not also drag the canvas underneath it.
const NO_DRAG_SELECTOR = "[data-no-canvas-drag], input, button";

export const ScrollableContainer = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
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

  const dragControls = useDragControls();

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
      const containerRect = container.getBoundingClientRect();
      const contentWidth = containerRect.width * WIDTH_MULTIPLIER;
      const contentHeight = containerRect.height * HEIGHT_MULTIPLIER;
      content.style.width = contentWidth + "px";
      content.style.height = contentHeight + "px";

      const newOffset = {
        x: (containerRect.width - contentWidth) / 2,
        y: (containerRect.height - contentHeight) / 2,
      };

      const newConstraints = {
        left: containerRect.width - contentWidth,
        right: 0,
        top: containerRect.height - contentHeight,
        bottom: 0,
      };

      setConstraints(newConstraints);
      x.set(newOffset.x);
      y.set(newOffset.y);
      setIsReady(true);
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
          dragListener={false}
          dragControls={dragControls}
          onPointerDown={(e) => {
            if ((e.target as Element).closest(NO_DRAG_SELECTOR)) return;
            dragControls.start(e);
          }}
          dragElastic={0.2}
          style={{
            x,
            y,
            position: "relative",
            // The canvas takes every touch drag that starts on it, in any
            // direction. The page scrolls from anywhere outside the window.
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            visibility: isReady ? "visible" : "hidden",
          }}
          dragConstraints={constraints}
        >
          {children}
        </motion.div>
      </div>
    </ScrollContext.Provider>
  );
};
