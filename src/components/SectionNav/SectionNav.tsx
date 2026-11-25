import { useEffect, useState } from "react";

import { SECTIONS, type SectionId } from "@/constants/Site";
import { useStrings } from "@/i18n/LanguageContext";

import { scrollToSection } from "@/utils/scrollToSection";

import styles from "./SectionNav.module.scss";

/**
 * Floating section pill for small screens. The inverting marker slides to
 * whichever section is crossing the middle of the viewport.
 */
export const SectionNav = () => {
  const t = useStrings();
  const [active, setActive] = useState<SectionId>("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // A thin band across the centre of the screen.
      { rootMargin: "-50% 0px -50% 0px" }
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const index = SECTIONS.findIndex((section) => section.id === active);

  return (
    <nav
      className={styles.nav}
      aria-label={t.topBar.sectionsNav}
      style={{ "--index": index } as React.CSSProperties}
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => scrollToSection(e, section.id)}
          aria-label={t.sections[section.id]}
          aria-current={section.id === active ? "true" : undefined}
        >
          {section.no}
        </a>
      ))}
    </nav>
  );
};
