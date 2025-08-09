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
    return null;
  }

  return (
    <>
      <main className={styles.body}>
        <MobileNav contentRef={contentRef} />
        <div className={styles.content} ref={contentRef}>
          <Hero />
          <div className={styles.about} data-index={1}>
            <p>
              A frontend developer based in Texas <br />
              I'm currently working at <a href="https://www.goat.com">
                GOAT
              </a>{" "}
              as a software engineer.
            </p>
          </div>
          <div className={styles.projects} data-index={2}>
            <h2>More to come!</h2>
          </div>
        </div>
      </main>
      <CustomCursor />
    </>
  );
}

export default Home;
