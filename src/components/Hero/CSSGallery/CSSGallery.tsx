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
import { GalleryItem } from "@/components/Hero/CSSGallery/GalleryItem/GalleryItem";

import styles from "./CSSGallery.module.scss";

export const CSSGallery = () => {
  return (
    <ScrollableContainer className={cn(styles.window, "hideScrollbar")}>
      {/* Center piece - almost stationary, minimal movement */}
      <GalleryItem
        className={cn(styles.items, styles.iHeartCss)}
        depth={0.1}
        rotationIntensity={0.3}
      >
        <IHeartCss />
      </GalleryItem>

      {/* Items at dramatically different depths for visible parallax */}
      <GalleryItem
        className={cn(styles.items, styles.loader)}
        depth={1.5}
        rotationIntensity={1.8}
      >
        <Loader />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.switch)}
        depth={0.8}
        rotationIntensity={1.2}
      >
        <Switch />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.burgerMenu)}
        depth={1.8}
        rotationIntensity={2}
      >
        <BurgerMenu />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.randomText)}
        depth={0.5}
        rotationIntensity={0.8}
      >
        <RandomText />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.slider)}
        depth={1.2}
        rotationIntensity={1.5}
      >
        <Slider min={0} max={100} step={1} defaultValue={50} onChange={() => { }} />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.radixSpinner)}
        depth={2}
        rotationIntensity={2.5}
      >
        <RadixSpinner />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.codepen)}
        depth={0.6}
        rotationIntensity={1}
      >
        <a href="https://codepen.io/rmatsuda" target="_blank" draggable={false}>
          Visit my <FaCodepen />
        </a>
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.moreToCome)}
        depth={0.35}
        rotationIntensity={0.5}
      >
        <div>More to come...</div>
      </GalleryItem>
    </ScrollableContainer>
  );
};
