import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import type { ProjectType } from "@/types/ProjectType";
import { PROJECTS } from "@/constants/Projects";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useLang, useStrings } from "@/i18n/LanguageContext";
import { FINE_POINTER, useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./Work.module.scss";

const MORPH = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 } as const;

const layoutIdFor = (project: ProjectType, slot: "pane" | "thumb") =>
  `shot:${slot}:${project.title}`;

type Enlarged = { project: ProjectType; layoutId: string };

const twoDigits = (n: number) => String(n).padStart(2, "0");

/** Previous / next controls for a project with more than one screenshot. */
const Pager = ({
  index,
  total,
  onStep,
}: {
  index: number;
  total: number;
  onStep: (delta: number) => void;
}) => {
  const t = useStrings().work;

  if (total < 2) return null;

  return (
    <div className={styles.pager}>
      <button type="button" onClick={() => onStep(-1)} aria-label={t.prevShot}>
        ←
      </button>
      <span aria-live="polite">
        {twoDigits(index + 1)} / {twoDigits(total)}
      </span>
      <button type="button" onClick={() => onStep(1)} aria-label={t.nextShot}>
        →
      </button>
    </div>
  );
};

const Row = ({
  project,
  shot,
  active,
  enlarged,
  onActivate,
  onEnlarge,
  onStep,
}: {
  project: ProjectType;
  /** Which of the project's screenshots is showing. */
  shot: number;
  active: boolean;
  enlarged: Enlarged | null;
  onActivate: () => void;
  onEnlarge: (enlarged: Enlarged) => void;
  onStep: (delta: number) => void;
}) => {
  const t = useStrings().work;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const thumbId = layoutIdFor(project, "thumb");
  const image = project.images[shot];

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
      <div className={styles.shot}>
        <button
          type="button"
          className={styles.thumb}
          onClick={() => onEnlarge({ project, layoutId: thumbId })}
          aria-label={t.enlarge(project.title)}
          data-measure
          data-rev-keep
        >
          {enlarged?.layoutId !== thumbId && (
            <motion.img
              layoutId={thumbId}
              transition={MORPH}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              draggable={false}
            />
          )}
        </button>
        <Pager index={shot} total={project.images.length} onStep={onStep} />
      </div>

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
              {project.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
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
  shot,
  onClose,
  onStep,
}: {
  enlarged: Enlarged;
  shot: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) => {
  const t = useStrings().work;
  const { project, layoutId } = enlarged;
  const image = project.images[shot];
  const paged = project.images.length > 1;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!paged) return;
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onStep, paged]);

  return (
    <motion.div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={t.screenshot(project.title)}
      data-paged={paged || undefined}
      onClick={onClose}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.82)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.22 }}
    >
      <motion.img
        layoutId={layoutId}
        transition={MORPH}
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        draggable={false}
      />
      {paged && (
        <motion.div
          className={styles.lightboxPager}
          // Paging must not fall through to the backdrop, which closes.
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Pager index={shot} total={project.images.length} onStep={onStep} />
        </motion.div>
      )}
      <motion.button
        type="button"
        className={styles.close}
        onClick={onClose}
        autoFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {t.close} ×
      </motion.button>
    </motion.div>
  );
};

export const Work = () => {
  const finePointer = useMediaQuery(FINE_POINTER);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlarged, setEnlarged] = useState<Enlarged | null>(null);
  // Which screenshot each project is on, by title. The row, the preview pane
  // and the lightbox all read from here, so they never disagree.
  const [shots, setShots] = useState<Record<string, number>>({});
  const { lang } = useLang();
  const t = useStrings();
  const projects = PROJECTS[lang];

  const shotOf = (project: ProjectType) => shots[project.title] ?? 0;
  const step = (project: ProjectType, delta: number) => {
    const total = project.images.length;
    setShots((current) => ({
      ...current,
      [project.title]: ((current[project.title] ?? 0) + delta + total) % total,
    }));
  };

  const active = projects[activeIndex];
  const activeImage = active.images[shotOf(active)];
  const paneId = layoutIdFor(active, "pane");

  return (
    <section id="work" className={styles.section}>
      <SectionHeader
        no="03"
        title={t.sections.work}
        meta={t.work.meta(projects.length)}
      />

      <LayoutGroup>
        <div className={styles.layout}>
          <ol className={styles.index}>
            {projects.map((project, i) => (
              <Row
                key={project.title}
                project={project}
                shot={shotOf(project)}
                active={i === activeIndex}
                enlarged={enlarged}
                onActivate={() => setActiveIndex(i)}
                onEnlarge={setEnlarged}
                onStep={(delta) => step(project, delta)}
              />
            ))}
          </ol>

          <figure className={styles.pane}>
            <button
              type="button"
              className={styles.frame}
              onClick={() => setEnlarged({ project: active, layoutId: paneId })}
              aria-label={t.work.enlarge(active.title)}
              data-measure
              data-rev-keep
            >
              {enlarged?.layoutId !== paneId && (
                <motion.img
                  key={active.title}
                  layoutId={paneId}
                  transition={MORPH}
                  src={activeImage.src}
                  width={activeImage.width}
                  height={activeImage.height}
                  alt={activeImage.alt}
                  draggable={false}
                />
              )}
            </button>
            <Pager
              index={shotOf(active)}
              total={active.images.length}
              onStep={(delta) => step(active, delta)}
            />
            <figcaption>
              <span>
                {t.work.figure(active.no, active.title)}
              </span>
              <span>{finePointer ? t.work.enlargeFine : t.work.enlargeTouch}</span>
            </figcaption>
          </figure>
        </div>

        {createPortal(
          <AnimatePresence>
            {enlarged && (
              <Lightbox
                key={enlarged.layoutId}
                enlarged={enlarged}
                shot={shotOf(enlarged.project)}
                onClose={() => setEnlarged(null)}
                onStep={(delta) => step(enlarged.project, delta)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
      </LayoutGroup>
    </section>
  );
};
