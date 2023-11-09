import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styles from "./main.module.scss";
import {
  resetPassword,
  checkResetPasswordToken,
} from "src/redux/slices/resetPass";
import { logoutUser } from "src/redux/slices/auth";

export const ConfirmNewPassPage = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmedPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(checkResetPasswordToken(token));
        console.log(response);
        if (response.payload.status !== 200) {
          console.error("Invalid or expired token. Please request a new one.");

          await dispatch(logoutUser());
          navigate("/");
        }
      } catch (e) {
        console.error(
          "An error occurred while checking the token. Please try again."
        );
      }
    };
    fetchData();
  }, [dispatch, token, navigate]);

  const handleResetPassword = async () => {
    try {
      if (formData.password.length < 6) {
        console.error("Password must be at least 6 characters long.");
        return;
      }

      if (formData.confirmedPassword.length < 6) {
        console.error("Confirmed password must be at least 6 characters long.");
        return;
      }

      if (formData.password === formData.confirmedPassword) {
        const payload = {
          passwordData: {
            password: formData.password,
            confirmedPassword: formData.confirmedPassword,
          },
          token,
        };
        const response = await dispatch(resetPassword(payload));
        console.log(response.payload);
        if (response.payload.status === 200) {
          navigate("/auth/login");
        } else {
          console.error(
            "An error occurred while resetting the password. Please try again."
          );
        }
      } else {
        console.error("Passwords do not match.");
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.confirmPage}>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.myLabel}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          minLength="6"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmedPassword" className={styles.myLabel}>
          Confirm new password
        </label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={formData.confirmedPassword}
          minLength="6"
          onChange={handleInputChange}
        />
      </div>

      <button className={styles.confirmBut} onClick={handleResetPassword}>
        Confirm new Password
      </button>
    </div>
  );
};
