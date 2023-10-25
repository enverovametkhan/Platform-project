import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./main.module.scss";
import { changePassword } from "src/redux/slices/resetPass";

const ConfirmNewPassPage = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await dispatch(
        changePassword({ token, password, confirmedPassword })
      );

      console.log(response);
    } catch (error) {
      console.error("Password change error:", error);
    }
  };

  return (
    <div className={styles.confirmPage}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.myLabel}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.myLabel}>
            Confirm new password
          </label>
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </div>

        <button className={styles.confirmBut} type="submit">
          Confirm new Password
        </button>
      </form>
    </div>
  );
};

export default ConfirmNewPassPage;
