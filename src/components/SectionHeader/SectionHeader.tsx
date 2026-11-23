import styles from "./SectionHeader.module.scss";

type Props = {
  no: string;
  title: string;
  meta?: string;
};

export const SectionHeader = ({ no, title, meta }: Props) => (
  <header className={styles.header}>
    <div className={styles.lead}>
      <span className={styles.no} aria-hidden="true">
        {no}
      </span>
      <h2 className={styles.title} data-measure>
        {title}
      </h2>
    </div>
    {meta && <span className={styles.meta}>{meta}</span>}
  </header>
);
