import React, { useState } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "src/authContext/authContext";

export const LoginPage = () => {
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData, setFormData);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.logHeader}>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.myLabel}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.myLabel}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button className={styles.logBut} type="submit">
          Log In
        </button>

        <div className={styles.forgotPass}>
          <Link to="/auth/resetpass">Forgot Password</Link>
        </div>

        <div className={styles.signStyle}>
          <p className={styles.dontStyle}>Don't have an account?</p>
          <div className={styles.signLink}>
            <Link to="/auth/signup">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
