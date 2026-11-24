import { LINKS } from "@/constants/Site";
import { Name } from "./Name";
import { Poke } from "./Poke";
import { StackRuler } from "./StackRuler";

import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section id="top" className={styles.hero}>
      <Name />

      <div className={styles.below}>
        <p className={styles.claim} data-measure>
          Howdy! I'm a fullstack engineer. I like building things that are
          fast, feel good to use, and don't fall over when a lot of people
          show up at once.
        </p>

        <dl className={styles.spec}>
          <div>
            <dt>Role</dt>
            <dd>Software Engineer, Full Stack</dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>Jersey City, NJ</dd>
          </div>
          <div className={styles.stackRow}>
            <dt>Stack</dt>
            <dd>
              <StackRuler />
            </dd>
          </div>
          <div>
            <dt>Main</dt>
            <dd>
              <Poke />
            </dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd className={styles.links}>
              <a href={`mailto:${LINKS.email}`}>Email</a>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
