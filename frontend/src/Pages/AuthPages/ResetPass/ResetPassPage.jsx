import React, { useEffect } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";

const ResetPassPage = () => {
  useEffect(() => {
    console.log("ResetPassPage component mounted");

    return () => {
      console.log("ResetPassPage component unmounted");
    };
  }, []);

  return (
    <div className={styles.resetPass}>
      <h1 className={styles.resHead}>Reset Password</h1>
      <p className={styles.resText}>Enter the email you use to sign in.</p>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.myLabel}>
          Email
        </label>
        <input type="email" id="email" />
      </div>
      <Link to="/confirmpass">
        <button className={styles.resButton}>Get Password Link</button>
      </Link>
    </div>
  );
};

export default ResetPassPage;
