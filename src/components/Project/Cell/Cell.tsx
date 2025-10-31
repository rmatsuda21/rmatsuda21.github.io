import cn from "classnames";

import { Icons } from "@/constants/Icons";
import type { ProjectType } from "@/types/ProjectType";

import styles from "./Cell.module.scss";

type CellProps = {
  project: ProjectType;
  onClick: () => void;
  className?: string;
  dark?: boolean;
};

export const Cell = ({
  project,
  onClick,
  className,
  dark = true,
}: CellProps) => {
  const { img, gif, title, techStack } = project;

  const style = {
    "--bg": `url(${img})`,
    ...(gif && { "--gif": `url(${gif})` }),
  } as React.CSSProperties;

  return (
    <button
      className={cn(
        styles.cell,
        { [styles.gif]: gif, [styles.dark]: dark },
        className
      )}
      style={style}
      onClick={onClick}
    >
      <h2>{title}</h2>
      {techStack?.length && techStack.length > 0 && (
        <div className={styles.techStack}>
          {techStack.map((tech) => Icons[tech].icon)}
        </div>
      )}
    </button>
  );
};
