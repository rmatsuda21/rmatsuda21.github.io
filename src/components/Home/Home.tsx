import { useEffect, useRef, useState } from "react";

import { CustomCursor } from "@/components/CustomCursor/CustomCursor";
import { MobileNav } from "@/components/MobileNav/MobileNav";
import { Hero } from "@/components/Hero/Hero";
import { Experience } from "@/components/Experience/Experience";
import { Project } from "@/components/Project/Project";

import styles from "./Home.module.scss";

export const Home = () => {
  const [hasRendered, setHasRendered] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setHasRendered(true);
    });
  }, []);

  if (!hasRendered) {
    return <div style={{ height: "100vh", backgroundColor: "black" }}></div>;
  }

  const setIndex = (index: number) => {
    contentRef.current?.style.setProperty("--selected-index", index.toString());
  };

  const incrementIndex = () => {
    const currentIndex = Number(
      contentRef.current?.style.getPropertyValue("--selected-index")
    );
    setIndex(Math.min(currentIndex + 1, 2));
  };

  const decrementIndex = () => {
    const currentIndex = Number(
      contentRef.current?.style.getPropertyValue("--selected-index")
    );
    setIndex(Math.max(currentIndex - 1, 0));
  };

  return (
    <>
      <main id="main" className={styles.body} ref={contentRef}>
        <MobileNav
          incrementIndex={incrementIndex}
          decrementIndex={decrementIndex}
          setIndex={setIndex}
        />
        <div className={styles.content} ref={contentRef}>
          <Hero />
          <Experience />
          <Project />
        </div>
      </main>
      <CustomCursor />
    </>
  );
};
