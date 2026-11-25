import { LINKS } from "@/constants/Site";
import { useStrings } from "@/i18n/LanguageContext";
import { Name } from "./Name";
import { Poke } from "./Poke";
import { StackRuler } from "./StackRuler";

import styles from "./Hero.module.scss";

export const Hero = () => {
  const t = useStrings().hero;

  return (
    <section id="top" className={styles.hero}>
      <Name />

      <div className={styles.below}>
        <p className={styles.claim} data-measure>
          {t.claim}
        </p>

        <dl className={styles.spec}>
          <div>
            <dt>{t.role}</dt>
            <dd>{t.roleValue}</dd>
          </div>
          <div>
            <dt>{t.base}</dt>
            <dd>{t.baseValue}</dd>
          </div>
          <div className={styles.stackRow}>
            <dt>{t.stack}</dt>
            <dd>
              <StackRuler />
            </dd>
          </div>
          <div>
            <dt>{t.main}</dt>
            <dd>
              <Poke />
            </dd>
          </div>
          <div>
            <dt>{t.contact}</dt>
            <dd className={styles.links}>
              <a href={`mailto:${LINKS.email}`}>{t.email}</a>
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
