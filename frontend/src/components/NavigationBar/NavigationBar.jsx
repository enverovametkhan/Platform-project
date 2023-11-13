import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./main.module.scss";
import max from "src/Assets/max.jpeg";
import { useAuth } from "src/authContext/authContext";

function LogoutButton() {
  const { handleLogout } = useAuth();

  const handleLogoutUser = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Link to="/" className={styles.link}>
      <button className={styles.logoutButton} onClick={handleLogoutUser}>
        Logout
      </button>
    </Link>
  );
}

export function NavigationBar() {
  return (
    <div>
      <div>
        <h1 className={styles.yourClass}>the happy blog</h1>
        <Link to="/dashboard/myaccount">
          <img className={styles.image} src={max} alt="Image" />
        </Link>
      </div>

      <div className={styles.navigationBar}>
        <LogoutButton />
        <div className={styles.buttonWrapper}>
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
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
