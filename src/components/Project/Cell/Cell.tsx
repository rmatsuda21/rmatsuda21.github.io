import { useEffect, useRef } from "react";
import cn from "classnames";

import { Icons } from "@/constants/Icons";
import type { ProjectType } from "@/types/ProjectType";

import styles from "./Cell.module.scss";

type CellProps = {
  project: ProjectType;
  onClick: () => void;
};

export const Cell = ({ project, onClick }: CellProps) => {
  const { img, gif, title, techStack } = project;

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--bg", `url(${img})`);

      if (gif) {
        ref.current.style.setProperty("--gif", `url(${gif})`);
      }
    }
  }, [img, gif]);

  useEffect(() => {
    const calculateAverageColor = (url: string, property: string) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = url;

      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(image, 0, 0);
          const imageData = ctx?.getImageData(0, 0, image.width, image.height);
          const data = imageData?.data;
          const averageColor = data
            ? Array.from(data).reduce(
                (acc: number, curr: number) => acc + curr,
                0
              ) / data.length
            : 0;
          const textColor =
            averageColor > 128 ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
          ref.current?.style.setProperty(property, textColor);
        } catch (error) {
          console.warn("Failed to calculate average color:", error);
          ref.current?.style.setProperty(property, "rgba(0, 0, 0, 1)");
        }
      };

      image.onerror = (error) => {
        console.warn("Failed to load image:", error);
        ref.current?.style.setProperty(property, "rgba(255, 255, 255, 1)");
      };
    };

    calculateAverageColor(img, "--text-color");
    if (gif) {
      calculateAverageColor(gif, "--gif-text-color");
    }
  }, []);

  return (
    <button
      className={cn(styles.cell, { [styles.gif]: gif })}
      ref={ref}
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
