import { useRef, useEffect } from "react";
import { FaHatCowboySide } from "react-icons/fa6";
import { GiTexas } from "react-icons/gi";

import { CSSGallery } from "@/components/Hero/CSSGallery/CSSGallery";
import TechCarousel from "@/components/TechCarousel/TechCarousel";

import styles from "./Hero.module.scss";

export const Hero = () => {
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heartRef.current) {
      const containerSize = heartRef.current
        .querySelector("div")
        ?.getBoundingClientRect();

      if (containerSize) {
        heartRef.current.scrollLeft =
          containerSize.width / 2 - heartRef.current.offsetWidth / 2;
        heartRef.current.scrollTop =
          containerSize.height / 2 - heartRef.current.offsetHeight / 2;
      }
    }
  }, []);

  return (
    <div id="hero" className={styles.hero}>
      <div className={styles.title}>
        <p>
          <span>Howdy</span> <FaHatCowboySide className={styles.hat} />
        </p>
        <p className={styles.center}>I'm Reo Matsuda</p>
        <p className={styles.right}>
          <span>
            A web developer <br />
            based in Texas
          </span>
          <GiTexas />
        </p>
      </div>
      <hr />
      <CSSGallery />
      <hr />
      <h3 className={styles.center}>My Tech Stack</h3>
      <TechCarousel
        className={styles.techCarousel}
        techStack={[
          "react",
          "next",
          "typescript",
          "sass",
          "motion",
          "vercel",
          "vite",
          "jest",
        ]}
      />
    </div>
  );
};
