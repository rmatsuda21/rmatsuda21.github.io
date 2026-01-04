import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";

import type { ProjectType } from "@/types/ProjectType";
import { PROJECTS } from "@/constants/Projects";
import { Cell } from "./Cell/Cell";
import { ExpandedProjectModal } from "./ExpandedProjectModal/ExpandedProjectModal";

import styles from "./Project.module.scss";

export const Project = () => {
  const [modalContent, setModalContent] = useState<ProjectType | null>(null);

  const activeLayoutId = useMemo(() => {
    if (!modalContent) return null;
    return `project:${modalContent.title}`;
  }, [modalContent]);

  const handleCellClick = (content: ProjectType) => {
    setModalContent({
      ...content,
    });
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  useEffect(() => {
    if (!modalContent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleModalClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalContent]);

  useEffect(() => {
    if (!modalContent) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [modalContent]);

  return (
    <LayoutGroup>
      <div className={styles.wrapper}>
        <h1>Projects</h1>
        <div className={styles.content}>
          {PROJECTS.map((project) => {
            const layoutId = `project:${project.title}`;
            return (
              <Cell
                key={project.title}
                project={project}
                onClick={() => handleCellClick(project)}
                layoutId={layoutId}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {modalContent && activeLayoutId && (
          <ExpandedProjectModal
            project={modalContent}
            layoutId={activeLayoutId}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
