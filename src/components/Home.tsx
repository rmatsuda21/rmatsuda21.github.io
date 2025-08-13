import { useEffect, useRef, useState } from "react";

import { CustomCursor } from "./CustomCursor";
import { MobileNav } from "./MobileNav";
import { Hero } from "./Hero";

import styles from "@styles/Home.module.css";
function Home() {
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

  return (
    <>
      <main id="main" className={styles.body} ref={contentRef}>
        <MobileNav setIndex={setIndex} />
        <div className={styles.content} ref={contentRef}>
          <Hero />
          <div className={styles.about}>
            <h2>Projects</h2>
          </div>
          <div className={styles.projects}>
            <h2>More to come!</h2>
          </div>
        </div>
      </main>
      <CustomCursor />
    </>
  );
}

export default Home;
