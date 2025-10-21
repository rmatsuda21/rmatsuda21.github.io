import { useState } from "react";

import type { ProjectType } from "@/types/ProjectType";
import { projects } from "@/constants/Projects";
import { Cell } from "./Cell/Cell";
import { Modal } from "./Modal/Modal";

import styles from "./Project.module.scss";

export const Project = () => {
  const [modalContent, setModalContent] = useState<ProjectType | null>(null);

  const handleCellClick = (content: ProjectType) => {
    setModalContent({
      img: content.img,
      gif: content.gif,
      title: content.title,
      techStack: content.techStack,
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
          {projects.map((project) => (
            <Cell
              key={project.title}
              project={project}
              onClick={() => handleCellClick(project)}
            />
          ))}
        </div>
      </div>

      <Modal onClose={handleModalClose} open={!!modalContent}>
        <div>Under construction...</div>
      </Modal>
    </>
  );
};
