import { useEffect, useRef } from "react";

import styles from "./Fidget.module.scss";

// Degrees per second.
const KICK = 900;
const MAX_SPEED = 3600;
const STOP_BELOW = 6;
// Seconds for the spin to fall to about a third.
const COAST = 1.6;

const LOBES = [0, 120, 240];

/** A fidget spinner: flick it round, or tap it for a push. */
export const Fidget = () => {
  const bodyRef = useRef<SVGSVGElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const state = useRef({
    angle: 0,
    speed: 0,
    frame: 0,
    last: 0,
    grab: null as null | { angle: number; at: number; moved: number },
  });

  const render = () => {
    const s = state.current;
    if (bodyRef.current) {
      bodyRef.current.style.transform = `rotate(${s.angle}deg)`;
    }
    if (readoutRef.current) {
      const rpm = Math.round(Math.abs(s.speed) / 6);
      readoutRef.current.textContent = `${String(rpm).padStart(3, "0")} RPM`;
    }
  };

  const coast = (now: number) => {
    const s = state.current;
    const dt = Math.min(0.05, (now - s.last) / 1000);
    s.last = now;
    s.angle += s.speed * dt;
    s.speed *= Math.exp(-dt / COAST);
    if (Math.abs(s.speed) < STOP_BELOW) s.speed = 0;
    render();
    s.frame = s.speed === 0 ? 0 : requestAnimationFrame(coast);
  };

  const release = () => {
    const s = state.current;
    cancelAnimationFrame(s.frame);
    s.last = performance.now();
    s.frame = requestAnimationFrame(coast);
  };

  useEffect(() => {
    const s = state.current;
    return () => cancelAnimationFrame(s.frame);
  }, []);

  const pointerAngle = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return (
      (Math.atan2(
        e.clientY - (rect.top + rect.height / 2),
        e.clientX - (rect.left + rect.width / 2)
      ) *
        180) /
      Math.PI
    );
  };

  return (
    <div className={styles.fidget} data-no-canvas-drag>
      <div
        className={styles.hit}
        role="img"
        aria-label="A fidget spinner"
        onPointerDown={(e) => {
          const s = state.current;
          cancelAnimationFrame(s.frame);
          s.frame = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
          s.grab = { angle: pointerAngle(e), at: performance.now(), moved: 0 };
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.grab) return;

          const angle = pointerAngle(e);
          const now = performance.now();
          // The short way round, so crossing ±180° is not a full turn back.
          const delta = ((angle - s.grab.angle + 540) % 360) - 180;
          const dt = Math.max(1, now - s.grab.at) / 1000;

          s.angle += delta;
          // Smoothed, so one jittery sample does not set the throw.
          s.speed = s.speed * 0.6 + (delta / dt) * 0.4;
          s.speed = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, s.speed));
          s.grab = { angle, at: now, moved: s.grab.moved + Math.abs(delta) };
          render();
        }}
        onPointerUp={() => {
          const s = state.current;
          if (!s.grab) return;
          // A tap rather than a flick: give it a push the way it was going.
          if (s.grab.moved < 4) {
            s.speed = Math.min(
              MAX_SPEED,
              Math.abs(s.speed) + KICK
            ) * (s.speed < 0 ? -1 : 1);
          }
          s.grab = null;
          release();
        }}
        onPointerCancel={() => {
          state.current.grab = null;
          release();
        }}
      >
        <svg ref={bodyRef} viewBox="-50 -50 100 100" aria-hidden="true">
          {LOBES.map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line x1="0" y1="0" x2="0" y2="-30" />
              <circle className={styles.lobe} cx="0" cy="-30" r="17" />
              <circle className={styles.hole} cx="0" cy="-30" r="8" />
            </g>
          ))}
          <circle className={styles.lobe} cx="0" cy="0" r="14" />
          <circle className={styles.hole} cx="0" cy="0" r="5" />
        </svg>
      </div>
      <span ref={readoutRef} className={styles.readout} aria-hidden="true">
        000 RPM
      </span>
    </div>
  );
};
