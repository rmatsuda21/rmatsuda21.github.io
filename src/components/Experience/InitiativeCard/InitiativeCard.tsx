import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "@/constants/Icons";

import type { Initiative } from "@/components/Experience/Item/Item";

import styles from "./InitiativeCard.module.scss";

type InitiativeCardProps = {
  initiative: Initiative;
};

export const InitiativeCard = ({ initiative }: InitiativeCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={styles.card}
      data-open={isOpen}
      initial={false}
      animate={{
        borderColor: isOpen
          ? "rgba(255, 255, 255, 0.28)"
          : "rgba(255, 255, 255, 0.12)",
        backgroundColor: isOpen
          ? "rgba(0, 0, 0, 0.33)"
          : "rgba(0, 0, 0, 0.25)",
        boxShadow: isOpen
          ? "0 8px 20px rgba(0, 0, 0, 0.35)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      whileHover={{
        borderColor: isOpen
          ? "rgba(255, 255, 255, 0.35)"
          : "rgba(255, 255, 255, 0.24)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
      }}
      transition={{ duration: 0.15 }}
    >
      <button
        type="button"
        className={styles.summary}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={styles.header}>
          <h3 className={styles.name}>{initiative.name}</h3>
        </div>
        <p className={styles.summaryText}>{initiative.summary}</p>
        <div className={styles.metaRow}>
          {initiative.tech.map((tech) => (
            <div
              key={tech}
              className={styles.techChip}
              title={Icons[tech].name}
              aria-label={Icons[tech].name}
            >
              {Icons[tech].icon}
            </div>
          ))}

          {initiative.impact?.length &&
            initiative.impact.map((pill) => (
              <span key={pill} className={styles.pill}>
                {pill}
              </span>
            ))}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.bodyWrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 350, damping: 32 },
              opacity: { duration: 0.2 },
            }}
          >
            <motion.div
              className={styles.body}
              initial={{ y: -6 }}
              animate={{ y: 0 }}
              exit={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.03 }}
            >
              <motion.div
                className={styles.section}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, duration: 0.22 }}
              >
                <p className={styles.label}>Wins</p>
                <ul className={styles.list}>
                  {initiative.wins.map((win, i) => (
                    <motion.li
                      key={win}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04, duration: 0.2 }}
                    >
                      {win}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className={styles.section}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.22 }}
              >
                <p className={styles.label}>Learning</p>
                <ul className={styles.list}>
                  {initiative.learnings.map((learning, i) => (
                    <motion.li
                      key={learning}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.14 + i * 0.04, duration: 0.2 }}
                    >
                      {learning}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
