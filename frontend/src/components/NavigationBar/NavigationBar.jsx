import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import styles from "./main.module.scss";
import max from "src/Assets/max.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "src/redux/slices/auth";

export function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      console.log(response);
    } catch (e) {
      console.error("Error");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.yourClass}>the happy blog</h1>

      <Link to="/dashboard/myaccount">
        <img className={styles.image} src={max} alt="Image" />
      </Link>
      <div className={styles.buttonsPage}>
        <Link to="/" className={styles.link}>
          <button
            className={`${styles.pageButton} ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>

        <Link to="/dashboard/createblog" className={styles.link}>
          <button className={styles.pageButton}>Create Blog</button>
        </Link>

        <Link to="/dashboard" className={styles.link}>
          <button className={styles.pageButton}>Blogs</button>
        </Link>

        <Link to="myaccount" className={styles.link}>
          <button className={styles.pageButton}>Account</button>
        </Link>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
