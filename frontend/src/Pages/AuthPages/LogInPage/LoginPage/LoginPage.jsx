// Import necessary libraries and modules
import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "src/authContext/authContext";

const GoogleSignIn = () => {
  useEffect(() => {
    window.onSignIn = (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId());
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());
    };
  }, []);

  return (
    <div>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
};

const LoginPage = () => {
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

      <meta
        name="google-signin-client_id"
        content="456070408145-hmq6d9tjej1s7eg3ovboem4qd42rd2gt.apps.googleusercontent.com"
      />
      <script src="https://apis.google.com/js/platform.js" async defer></script>

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
            autoComplete="email"
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
            autoComplete="current-password"
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

export { GoogleSignIn, LoginPage };
