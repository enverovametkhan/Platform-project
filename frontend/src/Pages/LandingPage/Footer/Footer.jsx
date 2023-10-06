import React from "react";
import styles from "./main.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Copyright © 2023 the happy blog. All rights reserved.
      </p>
      <p className={styles.footerText}>Privacy Policy</p>
      <p className={styles.footerText}>Terms of Use</p>
      <p className={styles.footerText}>Site Map</p>
      <p className={styles.footerText}>Kazakhstan</p>
    </footer>
  );
}

export default Footer;
