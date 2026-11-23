import { MotionConfig } from "motion/react";

import { CustomCursor } from "@/components/CustomCursor/CustomCursor";
import { Measure } from "@/components/CustomCursor/Measure";
import { TouchLens } from "@/components/CustomCursor/TouchLens";
import { TopBar } from "@/components/TopBar/TopBar";
import { Hero } from "@/components/Hero/Hero";
import { Experience } from "@/components/Experience/Experience";
import { Work } from "@/components/Work/Work";
import { Lab } from "@/components/Lab/Lab";
import { Contact } from "@/components/Contact/Contact";
import { SectionNav } from "@/components/SectionNav/SectionNav";

import styles from "./Home.module.scss";

export const Home = () => (
  <MotionConfig reducedMotion="user">
    <TopBar />
    <main id="main" className={styles.sheet}>
      <Hero />
      <Experience />
      <Work />
      <Lab />
      <Contact />
    </main>
    <SectionNav />
    <CustomCursor />
    <Measure />
    <TouchLens />
  </MotionConfig>
);
