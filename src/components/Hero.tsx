import { useRef, useEffect } from "react";
import cn from "classnames";
import {
  FaCss3,
  FaHatCowboySide,
  FaHeart,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import { GiTexas } from "react-icons/gi";
import {
  TbBrandNextjs,
  TbBrandSass,
  TbBrandTypescript,
  TbBrandVite,
} from "react-icons/tb";

import styles from "@styles/Hero.module.css";

export const Hero = () => {
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heartRef.current) {
      const containerSize = heartRef.current
        .querySelector("p")
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
    <div className={styles.hero}>
      <div className={styles.block}>
        <p>
          <span>Howdy</span> <FaHatCowboySide />
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
      <div ref={heartRef} className={cn(styles.IHeartCss, "hideScrollbar")}>
        <p>
          I{" "}
          <div className={styles.heart}>
            <FaHeart />
            <FaHeart className={styles.heart2} />
          </div>
          <FaCss3 />
        </p>
      </div>
      <hr />
      <p className={styles.center}>My Tech Stack</p>
      <div className={styles.stack}>
        <FaReact />
        <FaNodeJs />
        <TbBrandTypescript />
        <TbBrandVite />
        <TbBrandNextjs />
        <TbBrandSass />
      </div>
    </div>
  );
};
