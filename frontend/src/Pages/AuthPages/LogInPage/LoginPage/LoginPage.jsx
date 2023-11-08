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

    if (formData.email.length < 6) {
      setFormData({ ...formData, email: "" });
      console.error("Email must be at least 6 characters long.");
      return;
    }

    if (formData.password.length < 6) {
      setFormData({ ...formData, password: "" });
      console.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await handleLogin(formData, setFormData);
    } catch (error) {
      console.error("Login Error:", error);
      console.error("Invalid email or password. Please check your input.");
      setFormData({ email: "", password: "" });
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
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            minLength="6"
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
            minLength="6"
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
