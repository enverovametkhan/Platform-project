import React, { useEffect } from "react";
import styles from "./main.module.scss";

const ConfirmNewPassPage = () => {
  useEffect(() => {
    console.log("ConfirmNewPassPage component mounted");

    return () => {
      console.log("ConfirmNewPassPage component unmounted");
    };
  }, []);

  return (
    <div className={styles.confirmPage}>
      <h1 className={styles.confirmHeader}>
        Confirm new
        <br />
        <span className={styles.centerText}>Password</span>
      </h1>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.myLabel}>
          Password
        </label>
        <input type="password" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.myLabel}>
          Confirm new password
        </label>
        <input type="password" />
      </div>

      <button className={styles.confirmBut} type="submit">
        Confirm new Password
      </button>
    </div>
  );
};

export default ConfirmNewPassPage;
