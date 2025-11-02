import { useState, lazy, Suspense } from "react";
import { FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

import type { ProjectType } from "@/types/ProjectType";
import { PROJECTS } from "@/constants/Projects";
import { Icons } from "@/constants/Icons";
import { Cell } from "./Cell/Cell";

import styles from "./Project.module.scss";

const Modal = lazy(() =>
  import("@/components/Project/Modal/Modal").then((m) => ({
    default: m.Modal,
  }))
);

export const Project = () => {
  const [modalContent, setModalContent] = useState<ProjectType | null>(null);

  const handleCellClick = (content: ProjectType) => {
    setModalContent({
      ...content,
    });
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Projects</h1>
        <div className={styles.content}>
          {PROJECTS.map((project) => (
            <Cell
              key={project.title}
              project={project}
              onClick={() => handleCellClick(project)}
            />
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        <Modal
          className={styles.modal}
          onClose={handleModalClose}
          open={!!modalContent}
        >
          <h2>{modalContent?.title}</h2>

          <div className={styles.content}>
            <div className={styles.info}>
              <img src={modalContent?.img} alt={modalContent?.title} />

              <h3>Tech Stack</h3>
              <div className={styles.techStack}>
                {modalContent?.techStack?.map((tech) => (
                  <span key={tech}>{Icons[tech].icon}</span>
                ))}
              </div>
            </div>

            <div className={styles.description}>
              {modalContent?.description}

              <div className={styles.links}>
                <a href={modalContent?.link} target="_blank">
                  <FaExternalLinkAlt />
                </a>
                <a href={modalContent?.github} target="_blank">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </Modal>
      </Suspense>
    </>
  );
};
