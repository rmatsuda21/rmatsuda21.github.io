import { useRef, useEffect, Suspense, lazy } from "react";
import { FaHatCowboySide } from "react-icons/fa6";
import { GiTexas } from "react-icons/gi";

import styles from "./Hero.module.scss";
import { Loader } from "./CSSGallery/Loader/Loader";

const CSSGallery = lazy(() =>
  import("@/components/Hero/CSSGallery/CSSGallery").then((m) => ({
    default: m.CSSGallery,
  }))
);

const TechCarousel = lazy(() =>
  import("@/components/TechCarousel/TechCarousel").then((m) => ({
    default: m.TechCarousel,
  }))
);

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
      {typeof window !== "undefined" && (
        <Suspense
          fallback={
            <div className={styles.loader}>
              Loading...
              <Loader />
            </div>
          }
        >
          <CSSGallery />
        </Suspense>
      )}
      <hr />
      <h3 className={styles.center}>My Tech Stack</h3>
      <Suspense
        fallback={
          <p style={{ textAlign: "center", height: "51px" }}>Loading...</p>
        }
      >
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
      </Suspense>
    </div>
  );
};
