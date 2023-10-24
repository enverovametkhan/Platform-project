import { loginUser } from "src/redux/slices/auth";
import { setCurrentUser } from "src/redux/slices/users";
import React, { useState } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(formData));
      if (response.payload) {
        const userData = {
          userId: response.payload.userId,
          email: response.payload.email,
          username: response.payload.username,
        };
        console.log(response);
        dispatch(setCurrentUser(userData));
        navigate("/dashboard/*", { replace: true });
      }
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
          <Link to="/resetpass">Forgot Password</Link>
        </div>

        <div className={styles.signStyle}>
          <p className={styles.dontStyle}>Don't have an account?</p>
          <div className={styles.signLink}>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
