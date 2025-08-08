import styles from "../styles/Nav.module.css";

type Props = {
  index: number;
};

export const Nav = ({ index }: Props) => {
  return (
    <nav className={styles.body}>
      <input type="checkbox" id="nav-toggle" />
      <button className={styles.menu} />
      <ul>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
};
