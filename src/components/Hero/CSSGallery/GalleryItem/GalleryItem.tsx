import { motion, useSpring, useTransform } from "motion/react";
import { useScrollContext } from "../ScrollableContainer/ScrollContext";

interface GalleryItemProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  rotationIntensity?: number;
}

export const GalleryItem = ({
  children,
  className,
  depth = 0.5,
  rotationIntensity = 1,
}: GalleryItemProps) => {
  const { velocityX, velocityY } = useScrollContext();

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const rawParallaxX = useTransform(velocityX, (v) => v * depth * 0.12);
  const rawParallaxY = useTransform(velocityY, (v) => v * depth * 0.12);

  const parallaxX = useSpring(rawParallaxX, springConfig);
  const parallaxY = useSpring(rawParallaxY, springConfig);

  const rawRotateY = useTransform(velocityX, (v) => {
    const clampedV = Math.max(-2000, Math.min(2000, v));
    return clampedV * 0.025 * rotationIntensity;
  });
  const rawRotateX = useTransform(velocityY, (v) => {
    const clampedV = Math.max(-2000, Math.min(2000, v));
    return -clampedV * 0.025 * rotationIntensity;
  });

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const rawScale = useTransform([velocityX, velocityY], ([vx, vy]) => {
    const velocity = Math.sqrt(
      (vx as number) * (vx as number) + (vy as number) * (vy as number)
    );
    const clampedV = Math.min(velocity, 2000);
    return 1 + clampedV * 0.0002 * depth;
  });
  const scale = useSpring(rawScale, springConfig);

  return (
    <motion.div
      className={className}
      style={{
        x: parallaxX,
        y: parallaxY,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};

