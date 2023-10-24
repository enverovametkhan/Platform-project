import React from "react";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";

const AuthButtons = () => {
  return (
    <div className={styles.authButton}>
      <Link to="/auth/login">
        <button className={styles.authButton}>Log In</button>
      </Link>
      <Link to="/auth/signup">
        <button className={styles.authButton}>Sign Up</button>
      </Link>
    </div>
  );
};

export default AuthButtons;
