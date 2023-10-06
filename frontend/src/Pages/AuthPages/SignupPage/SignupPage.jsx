import React, { useEffect } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";

const SignupPage = () => {
  useEffect(() => {
    console.log("Signup component mounted");

    return () => {
      console.log("Signup component unmounted");
    };
  }, []);

  return (
    <div className={styles.SignUpPage}>
      <h1 className={styles.signHeader}>Sign Up</h1>
      <p className={styles.signText}>
        Enter your account details below or <Link to="/login">log in</Link>
      </p>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.myLabel}>
            Username
          </label>
          <input type="text" id="username" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.myLabel}>
            Email
          </label>
          <input type="email" id="email" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.myLabel}>
            Password
          </label>
          <input type="password" id="password" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.myLabel}>
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" />
        </div>
        <button className={styles.signBut} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
