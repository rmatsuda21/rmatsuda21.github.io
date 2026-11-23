import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { REDUCED_MOTION } from "@/hooks/useMediaQuery";
import { SECTIONS } from "@/constants/Site";

import { haptic } from "@/utils/haptic";
import { scrollToSection } from "@/utils/scrollToSection";

import styles from "./TopBar.module.scss";

type Rev = "dark" | "light";

const STORAGE_KEY = "rev";

const readRev = (): Rev => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

/** Tells each photo where the wipe's centre is, in its own coordinates. */
const aimKeepLayers = (x: number, y: number) => {
  for (const el of document.querySelectorAll<HTMLElement>("[data-rev-keep]")) {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--keep-x", `${x - rect.left}px`);
    el.style.setProperty("--keep-y", `${y - rect.top}px`);
  }
};

const clock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const Clock = () => {
  const [now, setNow] = useState(() => clock.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setNow(clock.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={styles.clock}>
      <span className={styles.place}>Jersey City, NJ · </span>
      <span className={styles.placeShort}>NJ · </span>
      <time>{now}</time> ET
    </span>
  );
};

const ROLL_MS = 320;
const ROLL_TICK_MS = 40;

/**
 * A section link. On hover or focus its number spins like a counter before
 * settling back, while a pair of brackets closes in around it (in CSS).
 */
const NavLink = ({ id, no, label }: { id: string; no: string; label: string }) => {
  const noRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const roll = () => {
    const el = noRef.current;
    if (!el || window.matchMedia(REDUCED_MOTION).matches) return;

    window.clearInterval(timer.current);
    const start = performance.now();

    timer.current = window.setInterval(() => {
      if (performance.now() - start >= ROLL_MS) {
        window.clearInterval(timer.current);
        el.textContent = no;
        return;
      }
      el.textContent = String(Math.floor(Math.random() * 100)).padStart(2, "0");
    }, ROLL_TICK_MS);
  };

  return (
    <a
      href={`#${id}`}
      onClick={(e) => scrollToSection(e, id)}
      onPointerEnter={roll}
      onFocus={roll}
    >
      <span ref={noRef} className={styles.no}>
        {no}
      </span>{" "}
      {label}
    </a>
  );
};

export const TopBar = () => {
  const [rev, setRev] = useState<Rev>(readRev);
  // Where the wipe is heading. Read by the transition-end handler.
  const target = useRef<Rev>(rev);

  useEffect(() => {
    const root = document.documentElement;

    // The lens has finished opening: swap the real palette in and put the
    // lens away. (It finishing closing needs nothing: dark is the default.)
    const handleEnd = (e: TransitionEvent) => {
      if (e.target !== root || e.propertyName !== "--rev-r") return;
      if (target.current === "light") root.dataset.rev = "light";
    };

    root.addEventListener("transitionend", handleEnd);
    return () => root.removeEventListener("transitionend", handleEnd);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Rev = target.current === "dark" ? "light" : "dark";
    target.current = next;
    setRev(next);
    haptic(12);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable; the toggle still works for this visit.
    }

    const root = document.documentElement;

    if (window.matchMedia(REDUCED_MOTION).matches) {
      root.style.setProperty("--rev-r", "0px");
      if (next === "light") root.dataset.rev = "light";
      else delete root.dataset.rev;
      return;
    }

    // The wipe is centred on the switch and reaches the farthest corner.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const reach = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );
    root.style.setProperty("--rev-x", `${x}px`);
    root.style.setProperty("--rev-y", `${y}px`);
    aimKeepLayers(x, y);

    if (root.dataset.rev === "light") {
      // Settled in the light palette: trade it for the dark palette under a
      // fully open lens, which looks identical, so the lens can then close.
      root.style.transition = "none";
      root.style.setProperty("--rev-r", `${reach}px`);
      delete root.dataset.rev;
      void root.offsetWidth;
      root.style.transition = "";
    }

    // Mid-way presses land here too: the radius just turns around.
    root.style.setProperty("--rev-r", next === "light" ? `${reach}px` : "0px");
  };

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.mark}>RM—Portfolio</span>
        <button
          type="button"
          className={styles.rev}
          onClick={toggle}
          aria-pressed={rev === "light"}
          aria-label="Light revision"
        >
          <span aria-hidden="true">Rev {rev === "light" ? "2.1" : "2.0"}</span>
          <span className={styles.switch} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <nav className={styles.nav} aria-label="Sections">
        {SECTIONS.slice(1).map((section) => (
          <NavLink
            key={section.id}
            id={section.id}
            no={section.no}
            label={section.label}
          />
        ))}
      </nav>

      <Clock />

      {createPortal(
        <div className="revWipe" aria-hidden="true" />,
        document.body
      )}
    </header>
  );
};
