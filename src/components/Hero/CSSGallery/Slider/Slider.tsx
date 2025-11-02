import { useState, useRef, type PointerEventHandler } from "react";
import {
  useMotionValue,
  useVelocity,
  useTransform,
  useSpring,
} from "motion/react";
import { motion } from "motion/react";
import cn from "classnames";

import styles from "./Slider.module.scss";

const clamp = (v: number, mi: number, ma: number) =>
  Math.max(mi, Math.min(ma, v));

interface Props {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
  className,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);

  const x = useMotionValue(0);
  const xVel = useVelocity(x);

  const rot = useTransform(xVel, [-1000, 1000], [-20, 20]);
  const sRot = useSpring(rot, {
    stiffness: 450,
    damping: 7,
    mass: 1,
  });

  const percent = ((value - min) / (max - min)) * 100;

  const handleMove = (clientX: number) => {
    if (!trackRef.current) return;

    const track = trackRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(clientX - track.left, track.width));
    x.set(pos);

    const percent = pos / track.width;
    const totSteps = (max - min) / step;
    const closestStep = Math.round(percent * totSteps);
    const newVal = clamp(min + closestStep * step, min, max);

    setValue(newVal);
    onChange?.(newVal);
  };

  const handlePointerDown: PointerEventHandler<Element> = (e) => {
    isDragging.current = true;

    if (handleRef.current) {
      handleRef.current.setPointerCapture(e.pointerId);
    }

    handleMove(e.clientX);
  };

  const handlePointerUp: PointerEventHandler<Element> = (e) => {
    isDragging.current = false;

    if (handleRef.current) {
      handleRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handlePointerMove: PointerEventHandler<Element> = (e) => {
    e.stopPropagation();

    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={trackRef}
      className={cn(className, styles.track)}
      onPointerDown={handlePointerDown}
    >
      <motion.div
        className={styles.progress}
        initial={{ left: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className={styles.thumb}
        initial={{ left: 0 }}
        animate={{ left: `${percent}%` }}
        transition={{ duration: 0.1 }}
      >
        <motion.button
          className={styles.handle}
          ref={handleRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          dragPropagation={false}
        />

        <motion.div
          className={styles.indicator}
          style={{ x: "-50%", rotate: sRot }}
        >
          {value}
        </motion.div>
      </motion.div>
    </div>
  );
};
