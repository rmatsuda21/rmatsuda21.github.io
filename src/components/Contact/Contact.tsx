import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "motion/react";

import { Scramble } from "@/components/Scramble/Scramble";
import { LINKS } from "@/constants/Site";
import { useStrings } from "@/i18n/LanguageContext";
import { haptic } from "@/utils/haptic";

import styles from "./Contact.module.scss";

const ROWS = [
  // The one label that is not a brand name; `null` takes the translated word.
  { label: null, value: LINKS.email, href: `mailto:${LINKS.email}` },
  { label: "GitHub", value: "rmatsuda21", href: LINKS.github },
  { label: "LinkedIn", value: "reomatsuda", href: LINKS.linkedin },
  { label: "CodePen", value: "rmatsuda", href: LINKS.codepen },
] as const;

const today = new Date();
const PRINTED = `${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;

// Rubber stamps carry the day they were used.
const STAMPED = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

/** How much larger than life the stamp starts, before it comes down. */
const STAMP_DROP_SCALE = 1.9;
const STAMP_DELAY_MS = 900;

/**
 * The sheet's title block, like the corner of a technical drawing. When the
 * end of the page comes into view an "APPROVED" stamp slams down on it and
 * the block takes the hit; press the stamp to bring it down again.
 */
const TitleBlock = () => {
  const t = useStrings().contact;
  const blockRef = useRef<HTMLElement>(null);
  const inView = useInView(blockRef, { once: true, amount: 0.9 });
  const stamp = useAnimationControls();
  const block = useAnimationControls();

  const slam = () => {
    // Never lands at quite the same angle twice.
    const rotate = -12 + Math.random() * 9;

    // Fixed keyframes, not a spring: a spring carries its speed over from an
    // interrupted run, so rapid presses made each slam overshoot further than
    // the last. This always starts and ends at the same sizes.
    stamp.stop();
    stamp.start({
      scale: [STAMP_DROP_SCALE, 0.94, 1],
      rotate: [rotate - 14, rotate, rotate],
      opacity: [0, 1, 1],
      transition: { duration: 0.32, times: [0, 0.7, 1], ease: "easeOut" },
    });

    block.stop();
    block.start({
      y: [0, 4, -1, 0],
      transition: { duration: 0.28, delay: 0.2, ease: "easeOut" },
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
          <dt>{t.blockTitle}</dt>
          <dd>
            {/* Decodes when it scrolls into view, and again on hover. */}
            {inView ? <Scramble text={t.endOfSheet} perChar={45} /> : " "}
          </dd>
        </div>
        <div>
          <dt>{t.drawnBy}</dt>
          <dd>Reo Matsuda</dd>
        </div>
        <div>
          <dt>{t.sheet}</dt>
          <dd>{t.sheetValue}</dd>
        </div>
        <div>
          <dt>{t.printed}</dt>
          <dd>{PRINTED}</dd>
        </div>
        <div>
          <dt>{t.builtWith}</dt>
          <dd>React + Motion</dd>
        </div>
      </dl>

      <motion.button
        type="button"
        className={styles.stamp}
        aria-label={t.stampAgain}
        initial={{ opacity: 0 }}
        animate={stamp}
        onClick={() => {
          haptic(16);
          slam();
        }}
      >
        <span>{t.approved}</span>
        <small>{STAMPED}</small>
      </motion.button>
    </motion.footer>
  );
};

export const Contact = () => {
  const t = useStrings().contact;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.body}>
        <h2 className={styles.title} data-measure>
          {t.title}
        </h2>
        <ul className={styles.links}>
          {ROWS.map((row) => {
            const external = !row.href.startsWith("mailto:");
            return (
              <li key={row.href}>
                <a
                  href={row.href}
                  data-lens="row"
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                >
                  <span className={styles.label}>{row.label ?? t.email}</span>
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
};
