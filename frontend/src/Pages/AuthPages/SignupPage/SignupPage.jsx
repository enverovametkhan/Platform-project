import React, { useState } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { signupUser } from "src/redux/slices/auth";
import { useDispatch } from "react-redux";

export const SignupPage = () => {
  const dispatch = useDispatch();

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
    try {
      if (formData.password !== formData.confirmedPassword) {
        console.log("Password and Confirm Password do not match");
        return;
      }

      const response = await dispatch(signupUser(formData));
      setFinishedSignUp(false);
      console.log(response.payload);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className={styles.SignUpPage}>
      {finishedSignUp ? (
        <div>
          <h1 className={styles.signHeader}>Sign Up</h1>
          <p className={styles.signText}>
            Enter your account details below or <Link to="/login">log in</Link>
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
                required
              />
            </div>
            <button className={styles.signBut} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <h1>Thanx for sign up</h1>
      )}
    </div>
  );
};

export default SignupPage;
