import { FaApple, FaAtom, FaHatCowboySide } from "react-icons/fa6";

import styles from "../styles/MobileNav.module.css";
import { useEffect } from "react";

type Props = {
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export const MobileNav = ({ contentRef }: Props) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (contentRef?.current) {
      const options = {
        root: contentRef.current,
        rootMargin: "0px",
        threshold: 0.5,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset?.index || 0
            );

            const nav = document.getElementById("nav");
            if (nav) {
              nav.style.setProperty("--selected-index", index.toString());
              nav.style.setProperty(
                "--highlight-color",
                `hsl(${index * 100}, 100%, 50%)`
              );
            }
          }
        });
      }, options);

      const elements = contentRef.current.querySelectorAll("[data-index]");
      elements.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleNavClick = (index: number) => {
    const nav = document.getElementById("nav");
    if (nav) {
      nav.style.setProperty("--selected-index", index.toString());
      nav.style.setProperty(
        "--highlight-color",
        `hsl(${index * 100}, 100%, 50%)`
      );

      const element = contentRef.current?.querySelector(
        `[data-index="${index}"]`
      );

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={styles.nav} id="nav">
      <FaHatCowboySide onClick={() => handleNavClick(0)} />
      <FaApple onClick={() => handleNavClick(1)} />
      <FaAtom onClick={() => handleNavClick(2)} />
    </nav>
  );
};
