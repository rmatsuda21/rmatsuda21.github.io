import cn from "classnames";
import { motion } from "motion/react";

import { Icons } from "@/constants/Icons";
import type { ProjectType } from "@/types/ProjectType";

import styles from "./Cell.module.scss";

type CellProps = {
  project: ProjectType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  dark?: boolean;
  layoutId?: string;
  style?: React.CSSProperties;
};

export const Cell = ({
  project,
  onClick,
  className,
  dark = true,
  layoutId,
  style: styleOverride,
}: CellProps) => {
  const { img, gif, title, techStack } = project;

  const style = {
    "--bg": `url(${img})`,
    ...(gif && { "--gif": `url(${gif})` }),
    ...styleOverride,
  } as React.CSSProperties;

  return (
    <motion.button
      className={cn(
        styles.cell,
        { [styles.gif]: gif, [styles.dark]: dark },
        className
      )}
      style={style}
      onClick={onClick}
      layoutId={layoutId}
      type="button"
    >
      <h2>{title}</h2>
      {techStack?.length && techStack.length > 0 && (
        <div className={styles.techStack}>
          {techStack.map((tech) => Icons[tech]?.icon ?? null)}
        </div>
      )}
    </motion.button>
  );
};
