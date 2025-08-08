import { useEffect, useRef } from "react";
import { FaHatCowboySide } from "react-icons/fa6";

import { CustomCursor } from "./CustomCursor";
import { MobileNav } from "./MobileNav";

import styles from "../styles/Home.module.css";

function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <main className={styles.body}>
        <MobileNav contentRef={contentRef} />
        <div className={styles.content} ref={contentRef}>
          <div className={styles.hero} data-index={0}>
            <h1>
              Howdy <FaHatCowboySide />
            </h1>
            <h2>I'm Reo Matsuda</h2>
          </div>
          <div className={styles.about} data-index={1}>
            <p>
              A frontend developer based in Texas. I'm currently working at{" "}
              <a href="https://www.goat.com">GOAT</a> as a software engineer.
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
