import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "motion/react";

import { Scramble } from "@/components/Scramble/Scramble";
import { LINKS } from "@/constants/Site";
import { haptic } from "@/utils/haptic";

import styles from "./Contact.module.scss";

const ROWS = [
  { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
  { label: "GitHub", value: "rmatsuda21", href: LINKS.github },
  { label: "LinkedIn", value: "reomatsuda", href: LINKS.linkedin },
  { label: "CodePen", value: "rmatsuda", href: LINKS.codepen },
] as const;

const today = new Date();
const PRINTED = `${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;

// Rubber stamps carry the day they were used.
const STAMPED = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

const STAMP_REST = { scale: 1, opacity: 1 };
const STAMP_DELAY_MS = 900;

/**
 * The sheet's title block, like the corner of a technical drawing. When the
 * end of the page comes into view an "APPROVED" stamp slams down on it and
 * the block takes the hit; press the stamp to bring it down again.
 */
const TitleBlock = () => {
  const blockRef = useRef<HTMLElement>(null);
  const inView = useInView(blockRef, { once: true, amount: 0.9 });
  const stamp = useAnimationControls();
  const block = useAnimationControls();

  const slam = () => {
    // Never lands at quite the same angle twice.
    const rotate = -12 + Math.random() * 9;

    stamp.set({ scale: 2.6, rotate: rotate - 14, opacity: 0 });
    stamp.start({
      ...STAMP_REST,
      rotate,
      transition: { type: "spring", stiffness: 700, damping: 24, mass: 0.8 },
    });
    block.start({
      y: [0, 4, -1, 0],
      transition: { duration: 0.28, delay: 0.09, ease: "easeOut" },
    });
  };

  useEffect(() => {
    if (!inView) return;

    // Give the reader a beat to arrive and take in the block before the
    // stamp comes down.
    const id = window.setTimeout(slam, STAMP_DELAY_MS);
    return () => window.clearTimeout(id);
    // `slam` only uses stable animation controls.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <motion.footer ref={blockRef} className={styles.titleBlock} animate={block}>
      <dl className={styles.cells}>
        <div className={styles.wide}>
          <dt>Title</dt>
          <dd>
            {/* Decodes when it scrolls into view, and again on hover. */}
            {inView ? <Scramble text="End of sheet" perChar={45} /> : " "}
          </dd>
        </div>
        <div>
          <dt>Drawn by</dt>
          <dd>Reo Matsuda</dd>
        </div>
        <div>
          <dt>Sheet</dt>
          <dd>1 of 1</dd>
        </div>
        <div>
          <dt>Printed</dt>
          <dd>{PRINTED}</dd>
        </div>
        <div>
          <dt>Built with</dt>
          <dd>React + Motion</dd>
        </div>
      </dl>

      <motion.button
        type="button"
        className={styles.stamp}
        aria-label="Stamp it again"
        initial={{ opacity: 0 }}
        animate={stamp}
        onClick={() => {
          haptic(16);
          slam();
        }}
      >
        <span>Approved</span>
        <small>{STAMPED}</small>
      </motion.button>
    </motion.footer>
  );
};

export const Contact = () => (
  <section id="contact" className={styles.section}>
    <div className={styles.body}>
      <h2 className={styles.title} data-measure>
        Say howdy.
      </h2>
      <ul className={styles.links}>
        {ROWS.map((row) => {
          const external = !row.href.startsWith("mailto:");
          return (
            <li key={row.label}>
              <a
                href={row.href}
                data-lens="row"
                {...(external && { target: "_blank", rel: "noreferrer" })}
              >
                <span className={styles.label}>{row.label}</span>
                <span className={styles.value}>
                  {row.value}
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
    <TitleBlock />
  </section>
);
