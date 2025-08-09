import { FaHatCowboySide, FaNodeJs, FaReact } from "react-icons/fa6";
import { GiTexas } from "react-icons/gi";
import {
  TbBrandNextjs,
  TbBrandSass,
  TbBrandTypescript,
  TbBrandVite,
} from "react-icons/tb";

import styles from "@styles/Home.module.css";

export const Hero = () => {
  return (
    <div className={styles.hero} data-index={0}>
      <span>
        Howdy <FaHatCowboySide />
      </span>
      <span>I'm Reo Matsuda</span>
      <span>
        A web developer based in Texas <GiTexas />
      </span>
      <h2>Tech Stack</h2>
      <div>
        <FaReact />
        <FaNodeJs />
        <TbBrandTypescript />
        <TbBrandVite />
        <TbBrandNextjs />
        <TbBrandSass />
      </div>
    </div>
  );
};
