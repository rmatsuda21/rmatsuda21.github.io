import { useEffect, useRef } from "react";
import cn from "classnames";

import { IHeartCss } from "./IHeartCSS/IHeartCss";
import { Loader } from "./Loader/Loader";
import { Switch } from "./Switch/Switch";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";

import styles from "./CSSGallery.module.scss";
import { FaCodepen } from "react-icons/fa6";
import { ScrollableContainer } from "./ScrollableContainer/ScrollableContainer";

export const CSSGallery = () => {
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
    <ScrollableContainer
      ref={heartRef}
      className={cn(styles.window, "hideScrollbar")}
    >
      <div className={styles.content}>
        <IHeartCss className={styles.iHeartCss} />
        <Loader className={styles.loader} />
        <Switch className={styles.switch} />
        <BurgerMenu className={styles.burgerMenu} />
        <a
          className={styles.codepen}
          href="https://codepen.io/rmatsuda"
          target="_blank"
        >
          Visit my <FaCodepen />
        </a>
        <div className={styles.moreToCome}>More to come...</div>
      </div>
    </ScrollableContainer>
  );
};
