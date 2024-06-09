import React from 'react';
import GbmSimulation from './GbmSimulation/GbmSimulation';
import IntroductionComponent from './GbmSimulation/IntroductionComponent';
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


      <IntroductionComponent />


      <main className={styles.mainContent}>
        <h1 className={styles.titleH1}>Monte Carlo Simulation - Basic Investment Simulation</h1>
        <p></p>
        <GbmSimulation /> 
      </main>

 
      <footer className={styles.headerFooter}>
        <p>© 2023 A.S. </p>
      </footer>
    </div>
  );
}

export default HomeComponent;
