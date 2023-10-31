import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import styles from "./main.module.scss";
import max from "src/Assets/max.jpeg";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/slices/auth";
import { getUser } from "src/redux/slices/users";

export function NavigationBar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      console.log(response);
    } catch (e) {
      console.error("Error");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.yourClass}>the happy blog</h1>
      <img className={styles.image} src={max} alt="Image" />

      <div className={styles.buttonsPage}>
        <Link to="/auth/login" className={styles.link}>
          <button
            className={`${styles.pageButton} ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>
      </div>
      <div>
        {" "}
        <Outlet></Outlet>
      </div>
    </div>
  );
}
