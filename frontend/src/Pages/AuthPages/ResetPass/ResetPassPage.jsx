import React, { useState } from "react";
import styles from "./main.module.scss";
import { useDispatch } from "react-redux";
import { resetPassword } from "src/redux/slices/resetPass";

const ResetPassPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [finishedResetPass, setFinishedResetPass] = useState(true);
  const handleResetPassword = async () => {
    try {
      let response = await dispatch(resetPassword(email));
      setFinishedResetPass(false);
      console.log("Password reset request successful. Response:", response);
    } catch (error) {
      console.error("Error occurred during password reset:", error);
    }
  };

  return (
    <div className={styles.resetPass}>
      {finishedResetPass ? (
        <div>
          <h1 className={styles.resHead}>Reset Password</h1>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.myLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button className={styles.resButton} onClick={handleResetPassword}>
            Get Password Link
          </button>
        </div>
      ) : (
        <h1>A link has been sent to your email to reset your password.</h1>
      )}
    </div>
  );
};

export default ResetPassPage;
