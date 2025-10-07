import styles from "../styles/Nav.module.css";

export const Nav = () => {
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
