import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styles from "./main.module.scss";
import {
  resetPassword,
  checkResetPasswordToken,
} from "src/redux/slices/resetPass";

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
        let response = await dispatch(checkResetPasswordToken(token));
        if (response.payload.status !== 200) {
          return;
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    };
    fetchData();
  }, [dispatch, token]);

  const handleResetPassword = async () => {
    try {
      if (formData.password === formData.confirmedPassword) {
        let payload = {
          passwordData: {
            password: formData.password,
            confirmedPassword: formData.confirmedPassword,
          },
          token,
        };
        let response = await dispatch(resetPassword(payload));

        console.log(response);

        navigate("/auth/login");
      } else {
        console.error("Passwords do not match");
      }
    } catch (error) {
      console.error("Error", error);
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
          onChange={handleInputChange}
        />
      </div>

      <button className={styles.confirmBut} onClick={handleResetPassword}>
        Confirm new Password
      </button>
    </div>
  );
};
