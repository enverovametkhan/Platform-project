import React, { useState } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "src/authContext/authContext";

export const SignupPage = () => {
  const { handleSignUp } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [finishedSignUp, setFinishedSignUp] = useState(true);
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
      await handleSignUp(formData, setFormData);
      setFinishedSignUp(false);
    } catch (error) {
      console.error("Signup Error:", error);
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className={styles.SignUpPage}>
      {finishedSignUp ? (
        <div>
          <h1 className={styles.signHeader}>Sign Up</h1>
          <p className={styles.signText}>
            Enter your account details below or{" "}
            <Link to="/auth/login">log in</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.myLabel}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.myLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                minLength="6"
                required
              />
            </div>
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
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmedPassword"
                name="confirmedPassword"
                value={formData.confirmedPassword}
                onChange={handleInputChange}
                minLength="6"
                required
              />
            </div>
            <button className={styles.signBut} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <h1>Thanks for signing up</h1>
      )}
    </div>
  );
};

export default SignupPage;
