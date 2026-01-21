import { createContext, useContext } from "react";
import { MotionValue } from "motion/react";

export interface ScrollContextValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
  velocityX: MotionValue<number>;
  velocityY: MotionValue<number>;
}

export const ScrollContext = createContext<ScrollContextValue | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollableContainer");
  }
  return context;
};

