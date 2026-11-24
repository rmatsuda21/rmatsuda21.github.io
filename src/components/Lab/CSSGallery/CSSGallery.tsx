import cn from "classnames";
import { FaCodepen } from "react-icons/fa6";

import { IHeartCss } from "@/components/Lab/CSSGallery/IHeartCSS/IHeartCss";
import { Loader } from "@/components/Lab/CSSGallery/Loader/Loader";
import { Switch } from "@/components/Lab/CSSGallery/Switch/Switch";
import { BurgerMenu } from "@/components/Lab/CSSGallery/BurgerMenu/BurgerMenu";
import { ScrollableContainer } from "@/components/Lab/CSSGallery/ScrollableContainer/ScrollableContainer";
import { RandomText } from "@/components/Lab/CSSGallery/RandomText/RandomText";
import { Slider } from "@/components/Lab/CSSGallery/Slider/Slider";
import { RadixSpinner } from "@/components/Lab/CSSGallery/RadixSpinner/RadixSpinner";
import { Keycap } from "@/components/Lab/CSSGallery/Keycap/Keycap";
import { Segmented } from "@/components/Lab/CSSGallery/Segmented/Segmented";
import { Knob } from "@/components/Lab/CSSGallery/Knob/Knob";
import { PixelPad } from "@/components/Lab/CSSGallery/PixelPad/PixelPad";
import { Tether } from "@/components/Lab/CSSGallery/Tether/Tether";
import { Dice } from "@/components/Lab/CSSGallery/Dice/Dice";
import { BubbleWrap } from "@/components/Lab/CSSGallery/BubbleWrap/BubbleWrap";
import { Stepper } from "@/components/Lab/CSSGallery/Stepper/Stepper";
import { Eyes } from "@/components/Lab/CSSGallery/Eyes/Eyes";
import { HoldButton } from "@/components/Lab/CSSGallery/HoldButton/HoldButton";
import { Fidget } from "@/components/Lab/CSSGallery/Fidget/Fidget";
import { Todo } from "@/components/Lab/CSSGallery/Todo/Todo";
import { GalleryItem } from "@/components/Lab/CSSGallery/GalleryItem/GalleryItem";

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
        className={cn(styles.items, styles.keycap)}
        depth={1.4}
        rotationIntensity={1.6}
      >
        <Keycap />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.segmented)}
        depth={0.7}
        rotationIntensity={1}
      >
        <Segmented />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.knob)}
        depth={1.6}
        rotationIntensity={1.8}
      >
        <Knob />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.pixelPad)}
        depth={1}
        rotationIntensity={1.3}
      >
        <PixelPad />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.tether)}
        depth={1.1}
        rotationIntensity={1.2}
      >
        <Tether />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.dice)}
        depth={1.7}
        rotationIntensity={2}
      >
        <Dice />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.bubbleWrap)}
        depth={0.9}
        rotationIntensity={1.1}
      >
        <BubbleWrap />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.stepper)}
        depth={1.3}
        rotationIntensity={1.5}
      >
        <Stepper />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.eyes)}
        depth={0.6}
        rotationIntensity={0.8}
      >
        <Eyes />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.holdButton)}
        depth={1.2}
        rotationIntensity={1.4}
      >
        <HoldButton />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.fidget)}
        depth={1.5}
        rotationIntensity={1.2}
      >
        <Fidget />
      </GalleryItem>

      <GalleryItem
        className={cn(styles.items, styles.todo)}
        depth={0.8}
        rotationIntensity={1}
      >
        <Todo />
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
