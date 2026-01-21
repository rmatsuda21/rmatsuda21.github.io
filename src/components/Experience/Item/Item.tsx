import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "@/constants/Icons";
import { FaChevronDown } from "react-icons/fa6";

import { InitiativeCard } from "@/components/Experience/InitiativeCard/InitiativeCard";

import styles from "./Item.module.scss";

export type Initiative = {
  name: string;
  summary: string;
  impact?: string[];
  wins: string[];
  learnings: string[];
  tech: (keyof typeof Icons)[];
};

type ItemProps = {
  company: string;
  title: string;
  date: string;
  techStack: (keyof typeof Icons)[];
  initiatives?: Initiative[];
};

export const Item = ({
  company,
  title,
  date,
  techStack,
  initiatives,
  children,
}: React.PropsWithChildren<ItemProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.item} data-open={isOpen}>
      <button
        type="button"
        className={styles.summary}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={styles.topRow}>
          <span className={styles.title}>{title}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.bottomRow}>
          <h2 className={styles.company}>{company}</h2>
          <motion.span
            className={styles.chevron}
            aria-hidden="true"
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <FaChevronDown />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.body}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <motion.div
              className={styles.inner}
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
            >
              <motion.div
                className={styles.roleStack}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.25 }}
              >
                <p>Role stack</p>
                <div className={styles.stack}>
                  {techStack.map((tech, i) => (
                    <motion.div
                      key={tech}
                      className={styles.techIcon}
                      title={Icons[tech].name}
                      aria-label={Icons[tech].name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.12 + i * 0.04, type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {Icons[tech].icon}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {initiatives?.length ? (
                <div className={styles.initiatives} aria-label="Projects and initiatives">
                  {initiatives.map((initiative, i) => (
                    <motion.div
                      key={initiative.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.15 + i * 0.08,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <InitiativeCard initiative={initiative} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className={styles.content}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                >
                  {children}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
