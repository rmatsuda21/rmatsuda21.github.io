import cn from "classnames";
import { FaCodepen } from "react-icons/fa6";

import { IHeartCss } from "@/components/Hero/CSSGallery/IHeartCSS/IHeartCss";
import { Loader } from "@/components/Hero/CSSGallery/Loader/Loader";
import { Switch } from "@/components/Hero/CSSGallery/Switch/Switch";
import { BurgerMenu } from "@/components/Hero/CSSGallery/BurgerMenu/BurgerMenu";
import { ScrollableContainer } from "@/components/Hero/CSSGallery/ScrollableContainer/ScrollableContainer";
import { RandomText } from "@/components/Hero/CSSGallery/RandomText/RandomText";
import { Slider } from "@/components/Hero/CSSGallery/Slider/Slider";
import { RadixSpinner } from "@/components/Hero/CSSGallery/RadixSpinner/RadixSpinner";

import styles from "./CSSGallery.module.scss";

export const CSSGallery = () => {
  return (
    <ScrollableContainer className={cn(styles.window, "hideScrollbar")}>
      <IHeartCss className={cn(styles.items, styles.iHeartCss)} />
      <Loader className={cn(styles.items, styles.loader)} />
      <Switch className={cn(styles.items, styles.switch)} />
      <BurgerMenu className={cn(styles.items, styles.burgerMenu)} />
      <RandomText className={cn(styles.items, styles.randomText)} />
      <Slider
        className={cn(styles.items, styles.slider)}
        min={0}
        max={100}
        step={1}
        defaultValue={50}
        onChange={() => {}}
      />
      <RadixSpinner className={cn(styles.items, styles.radixSpinner)} />
      <a
        className={cn(styles.items, styles.codepen)}
        href="https://codepen.io/rmatsuda"
        target="_blank"
        draggable={false}
      >
        Visit my <FaCodepen />
      </a>
      <div className={cn(styles.items, styles.moreToCome)}>More to come...</div>
    </ScrollableContainer>
  );
};
