import { useEffect, useState } from "react";

const SCROLL_SPEED = 1;

export const ScrollableContainer = ({
  className,
  children,
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<[number, number]>([0, 0]);
  const [scrollPos, setScrollPos] = useState<[number, number]>([0, 0]);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsDesktop(!hasTouch);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !ref.current) return;
    setIsDragging(true);
    const rect = ref.current!.getBoundingClientRect();
    setStartPos([e.pageX - rect.left, e.pageY - rect.top]);
    setScrollPos([ref.current.scrollLeft, ref.current.scrollTop]);
  };

  const handleMouseUp = () => isDesktop && setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !isDragging || !ref.current) return;
    e.preventDefault();

    const rect = ref.current.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;

    const walkX = (x - startPos[0]) * SCROLL_SPEED;
    const walkY = (y - startPos[1]) * SCROLL_SPEED;

    ref.current.scrollLeft = scrollPos[0] - walkX;
    ref.current.scrollTop = scrollPos[1] - walkY;
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={className}
    >
      {children}
    </div>
  );
};
