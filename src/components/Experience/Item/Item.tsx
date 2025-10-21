import { Icons } from "@/constants/Icons";

import styles from "./Item.module.scss";

type ItemProps = {
  company: string;
  title: string;
  date: string;
  techStack: (keyof typeof Icons)[];
};

export const Item = ({
  company,
  title,
  date,
  techStack,
  children,
}: React.PropsWithChildren<ItemProps>) => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span>{title}</span>
          <span>{date}</span>
        </div>
        <div className={styles.toggle}>
          <input type="checkbox" id={`${company}-${title}`} />
          <h2>{company}</h2>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.inner}>
          <div className={styles.techStack}>
            <p>Tech Stack</p>
            <div className={styles.stack}>
              {techStack.map((tech) => (
                <div key={tech}>{Icons[tech].icon}</div>
              ))}
            </div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};
