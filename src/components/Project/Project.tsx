import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup } from "motion/react";
import cn from "classnames";

import type { ProjectType } from "@/types/ProjectType";
import { PROJECTS } from "@/constants/Projects";
import { Cell } from "./Cell/Cell";
import { ExpandedProjectModal } from "./ExpandedProjectModal/ExpandedProjectModal";

import styles from "./Project.module.scss";

type FloatingCell = {
  project: ProjectType;
  rect: { top: number; left: number; width: number; height: number };
};

export const Project = () => {
  const [modalContent, setModalContent] = useState<ProjectType | null>(null);
  const [floatingCell, setFloatingCell] = useState<FloatingCell | null>(null);

  const activeLayoutId = useMemo(() => {
    if (!modalContent) return null;
    return `project:${modalContent.title}`;
  }, [modalContent]);

  const handleCellClick = (
    content: ProjectType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFloatingCell({
      project: { ...content },
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });
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
    const root = document.documentElement;

    if (!modalContent) {
      delete root.dataset.projectModalOpen;
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    root.dataset.projectModalOpen = "true";
    return () => {
      document.body.style.overflow = prevOverflow;
      delete root.dataset.projectModalOpen;
    };
  }, [modalContent]);

  return (
    <LayoutGroup>
      <div className={cn(styles.wrapper, "hideScrollbar")}>
        <h1>Projects</h1>
        <div className={styles.content}>
          {PROJECTS.map((project) => {
            const layoutId = `project:${project.title}`;
            const isFloating = floatingCell?.project.title === project.title;
            return (
              <Cell
                key={project.title}
                className={cn({ [styles.hiddenCell]: isFloating })}
                project={project}
                onClick={(e) => handleCellClick(project, e)}
                layoutId={isFloating ? undefined : layoutId}
              />
            );
          })}
        </div>
      </div>

      {floatingCell &&
        typeof document !== "undefined" &&
        createPortal(
          <Cell
            project={floatingCell.project}
            onClick={() => {}}
            layoutId={`project:${floatingCell.project.title}`}
            className={styles.floatingCell}
            style={{
              position: "fixed",
              ...floatingCell.rect,
              zIndex: 501,
            }}
          />,
          document.body
        )}

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setFloatingCell(null)}
      >
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
