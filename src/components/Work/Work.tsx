import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import type { ProjectType } from "@/types/ProjectType";
import { PROJECTS } from "@/constants/Projects";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { FINE_POINTER, useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./Work.module.scss";

const MORPH = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 } as const;

const layoutIdFor = (project: ProjectType, slot: "pane" | "thumb") =>
  `shot:${slot}:${project.title}`;

type Enlarged = { project: ProjectType; layoutId: string };

const Row = ({
  project,
  active,
  enlarged,
  onActivate,
  onEnlarge,
}: {
  project: ProjectType;
  active: boolean;
  enlarged: Enlarged | null;
  onActivate: () => void;
  onEnlarge: (enlarged: Enlarged) => void;
}) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const thumbId = layoutIdFor(project, "thumb");

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.row}
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active || undefined}
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={onActivate}
        onFocus={onActivate}
        data-lens="row"
      >
        <span className={styles.no}>{project.no}</span>
        <span className={styles.heading}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.tagline}>{project.tagline}</span>
        </span>
        <span className={styles.stack}>{project.stack}</span>
        <span className={styles.toggle} aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Small screens have no preview pane, so each row carries its figure. */}
      <button
        type="button"
        className={styles.thumb}
        onClick={() => onEnlarge({ project, layoutId: thumbId })}
        aria-label={`Enlarge the ${project.title} screenshot`}
        data-measure
        data-rev-keep
      >
        {enlarged?.layoutId !== thumbId && (
          <motion.img
            layoutId={thumbId}
            transition={MORPH}
            src={project.img}
            width={project.width}
            height={project.height}
            alt={project.alt}
            loading="lazy"
            draggable={false}
          />
        )}
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
            <div className={styles.case}>
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className={styles.links}>
                {project.links.map(({ label, href }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Lightbox = ({
  enlarged,
  onClose,
}: {
  enlarged: Enlarged;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const { project, layoutId } = enlarged;

  return (
    <motion.div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot`}
      onClick={onClose}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.82)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.22 }}
    >
      <motion.img
        layoutId={layoutId}
        transition={MORPH}
        src={project.img}
        width={project.width}
        height={project.height}
        alt={project.alt}
        draggable={false}
      />
      <motion.button
        type="button"
        className={styles.close}
        onClick={onClose}
        autoFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        Close ×
      </motion.button>
    </motion.div>
  );
};

export const Work = () => {
  const finePointer = useMediaQuery(FINE_POINTER);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlarged, setEnlarged] = useState<Enlarged | null>(null);

  const active = PROJECTS[activeIndex];
  const paneId = layoutIdFor(active, "pane");

  return (
    <section id="work" className={styles.section}>
      <SectionHeader
        no="03"
        title="Work"
        meta={`Index · ${PROJECTS.length} entries`}
      />

      <LayoutGroup>
        <div className={styles.layout}>
          <ol className={styles.index}>
            {PROJECTS.map((project, i) => (
              <Row
                key={project.title}
                project={project}
                active={i === activeIndex}
                enlarged={enlarged}
                onActivate={() => setActiveIndex(i)}
                onEnlarge={setEnlarged}
              />
            ))}
          </ol>

          <figure className={styles.pane}>
            <button
              type="button"
              className={styles.frame}
              onClick={() => setEnlarged({ project: active, layoutId: paneId })}
              aria-label={`Enlarge the ${active.title} screenshot`}
              data-measure
              data-rev-keep
            >
              {enlarged?.layoutId !== paneId && (
                <motion.img
                  key={active.title}
                  layoutId={paneId}
                  transition={MORPH}
                  src={active.img}
                  width={active.width}
                  height={active.height}
                  alt={active.alt}
                  draggable={false}
                />
              )}
            </button>
            <figcaption>
              <span>
                Fig. {active.no} — {active.title}
              </span>
              <span>{finePointer ? "Click" : "Tap"} to enlarge</span>
            </figcaption>
          </figure>
        </div>

        {createPortal(
          <AnimatePresence>
            {enlarged && (
              <Lightbox
                key={enlarged.layoutId}
                enlarged={enlarged}
                onClose={() => setEnlarged(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
      </LayoutGroup>
    </section>
  );
};
