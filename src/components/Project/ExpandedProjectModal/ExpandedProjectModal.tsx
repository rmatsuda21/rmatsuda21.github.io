import { Fragment } from "react";
import { motion } from "motion/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import type { ProjectType } from "@/types/ProjectType";
import { Icons } from "@/constants/Icons";

import styles from "./ExpandedProjectModal.module.scss";

type ExpandedProjectModalProps = {
  project: ProjectType;
  layoutId: string;
  onClose: () => void;
};

export const ExpandedProjectModal = ({
  project,
  layoutId,
  onClose,
}: ExpandedProjectModalProps) => {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      onClick={onClose}
    >
      <motion.button
        className={styles.close}
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      >
        ×
      </motion.button>

      <motion.div
        className={styles.expandedCard}
        layoutId={layoutId}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 38,
          mass: 0.9,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal}>
          <h1 className={styles.projectTitle}>{project.title}</h1>

          <motion.div
            className={styles.content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.18,
              ease: "easeInOut",
              delay: 0.06,
            }}
          >
            <div className={styles.info}>
              <img src={project.img} alt={project.title} />
              <hr />
              <h3 className={styles.title}>Tech Stack</h3>
              <div className={styles.techStack}>
                {project.techStack?.map((tech) => (
                  <Fragment key={tech}>{Icons[tech].icon}</Fragment>
                ))}
              </div>
              <hr />
            </div>

            <div className={styles.description}>
              {project.description}

              <div className={styles.links}>
                <a href={project.link} target="_blank" rel="noreferrer">
                  <FaExternalLinkAlt /> Visit Project
                </a>
                <a href={project.github} target="_blank" rel="noreferrer">
                  <FaGithub /> Github
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
