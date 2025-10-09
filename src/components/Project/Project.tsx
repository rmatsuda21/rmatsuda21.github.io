import { FaWrench } from "react-icons/fa6";

import styles from "./Project.module.css";

export const Project = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Projects</h1>
      <div className={styles.content}>
        <h2>
          Under construction <FaWrench />
        </h2>
      </div>
    </div>
  );
};
