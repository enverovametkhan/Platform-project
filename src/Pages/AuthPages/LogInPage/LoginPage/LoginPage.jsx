import React, { useEffect } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
  useEffect(() => {
    console.log("LoginPage component mounted");

    return () => {
      console.log("LoginPage component unmounted");
    };
  }, []);

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.logHeader}>Log in</h1>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.myLabel}>
            Email
          </label>
          <input type="email" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.myLabel}>
            Password
          </label>
          <input type="password" />
        </div>

        <button className={styles.logBut} type="submit">
          Log In
        </button>

        <div className={styles.forgotPass}>
          <Link to="/resetpass">Forgot Password</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
