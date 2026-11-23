import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ROLES, type Role } from "@/constants/Experience";
import { Scramble } from "@/components/Scramble/Scramble";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

import styles from "./Experience.module.scss";

const Row = ({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.row}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        data-lens="row"
      >
        <span className={styles.period}>{role.period}</span>
        <span className={styles.company}>{role.company}</span>
        <span className={styles.title}>{role.title}</span>
        <span className={styles.stack}>{role.stack}</span>
        <span className={styles.toggle} aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className={styles.panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className={styles.initiatives}>
              {role.initiatives.map((initiative) => (
                <article key={initiative.name} className={styles.initiative}>
                  <h3>{initiative.name}</h3>
                  <p>{initiative.summary}</p>

                  <dl className={styles.figures} data-measure>
                    {initiative.figures.map((figure, i) => (
                      <div key={figure.label}>
                        <dd>
                          {/* Each cell decodes a beat after the one before it. */}
                          <Scramble text={figure.value} delay={i * 140} />
                        </dd>
                        <dt>{figure.label}</dt>
                      </div>
                    ))}
                  </dl>

                  <ul className={styles.highlights}>
                    {initiative.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export const Experience = () => (
  <section id="experience" className={styles.section}>
    <SectionHeader
      no="02"
      title="Experience"
      meta={`${ROLES.length} roles · 2018—2026`}
    />
    <ol className={styles.ledger}>
      {ROLES.map((role, i) => (
        <Row
          key={`${role.company}-${role.title}`}
          role={role}
          defaultOpen={i === 0}
        />
      ))}
    </ol>
  </section>
);
