import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./main.module.scss";
import {
  getUser,
  selectCurrentUser,
  deleteUser,
  updateUser,
} from "src/redux/slices/users";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordReq } from "src/redux/slices/resetPass";
import { logoutUser } from "src/redux/slices/auth";
import { setCurrentUser } from "src/redux/slices/users";

export function MyAccount() {
  const dispatch = useDispatch();
  const { email, username } = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({ email: "", username: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getUser());
        console.log(response);
        setFormData({
          email: response.payload.email || "",
          username: response.payload.username || "",
        });
      } catch (e) {
        console.error("Error", e);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteUser = async () => {
    try {
      const response = await dispatch(deleteUser());
      console.log(response);
      await dispatch(logoutUser());
      await dispatch(setCurrentUser(""));
      navigate("/");
    } catch (e) {
      console.error("Error", e);
    }
  };

  const handleUpdateUser = async () => {
    if (email === formData.email && username === formData.username) {
      console.log("No changes to save.");
    } else {
      try {
        const response = await dispatch(updateUser(formData));
        console.log(response);
      } catch (e) {
        console.error("Error", e);
      }
    }
  };

  const handleSendLink = async () => {
    try {
      let response = await dispatch(resetPasswordReq(email));

      console.log("Password reset request successful. Response:", response);
    } catch (error) {
      console.error("Error occurred during password reset:", error);
    }
  };

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
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
              <label htmlFor="username" className={styles.myLabel}>
                Username
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className={styles.saveBut}
            type="button"
            onClick={handleUpdateUser}
          >
            Save
          </button>
        </form>
      </div>
      <div className={styles.secCont}>
        <h1 className={styles.secClass}>Security</h1>
        <p className={styles.resP}>Would you like to reset your password? </p>
        <button
          className={styles.sendBut}
          type="button"
          onClick={handleSendLink}
        >
          Send me a link
        </button>
      </div>
      <div className={styles.delPage}>
        <p className={styles.wouldA}>Would you like to delete your account? </p>
        <button
          className={styles.delBut}
          type="button"
          onClick={handleDeleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MyAccount;
