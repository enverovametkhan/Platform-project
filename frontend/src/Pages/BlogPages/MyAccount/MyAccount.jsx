import React, { useEffect } from "react";
import styles from "./main.module.scss";

export function MyAccount() {
  useEffect(() => {
    document.title = "My Account";
  }, []);

  return (
    <div className={styles.accPage}>
      <div className={styles.myAcc}>
        <h1 className={styles.yourClass}>My Account</h1>
        <h2 className={styles.myClass}>Personal information</h2>
        <form>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label htmlFor="email" className={styles.myLabel}>
                Email
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <input type="email" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label htmlFor="password" className={styles.myLabel}>
                Password
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <input type="password" />
            </div>
          </div>
          <button className={styles.saveBut} type="submit">
            Save
          </button>
        </form>
      </div>
      <div className={styles.secCont}>
        <h1 className={styles.secClass}>Security</h1>
        <p className={styles.resP}>Would you like to reset your password? </p>
        <button className={styles.sendBut} type="submit">
          Send me a link
        </button>
      </div>
      <div className={styles.delPage}>
        <p className={styles.wouldA}>Would you like to delete your account? </p>
        <button className={styles.delBut} type="submit">
          Delete
        </button>
      </div>
    </div>
  );
}

export default MyAccount;
