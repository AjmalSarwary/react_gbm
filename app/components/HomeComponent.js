// app/components/HomeComponent.js

import styles from './HomeComponent.module.css';

function HomeComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.headerFooter}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="Home.html" className={styles.navLink}>Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="Projects.html" className={styles.navLink}>Portfolio</a>
            </li>
            <li className={styles.navItem}>
              <a href="About.html" className={styles.navLink}>About</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <h1 className={styles.titleH1}>A curated display of my work</h1>
        <p>Welcome to a showcase of my recent work and a sneak peek into my ongoing projects.</p>
      </main>
      <footer className={styles.headerFooter}>
        <p>© 2023 A.S. </p>
      </footer>
    </div>
  );
}

export default HomeComponent;

