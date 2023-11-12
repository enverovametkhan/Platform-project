import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmailSwap } from "src/redux/slices/users";
import { useParams } from "react-router";
import { selectIsAuthenticated } from "src/redux/slices/auth";
import { Link } from "react-router-dom";
import { logoutUser } from "src/redux/slices/auth";
import { useNavigate } from "react-router";

export const EmailSwap = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await dispatch(confirmEmailSwap(token));
        console.log(response.payload);
        if (response.payload.status === 200) {
          setValidToken(true);
        } else {
          setValidToken(false);
          console.error("Invalid or expired token. Please request a new one.");
          await dispatch(logoutUser());
          navigate("/");
        }
      } catch (e) {
        console.log(e);
        setValidToken(false);
      }
    };

    fetchData();
  }, [dispatch, token]);

  return (
    <div>
      {validToken ? (
        <h1 className={styles.style}>Thank You for Confirming Email</h1>
      ) : (
        <p className={styles.notification}>
          The provided token is invalid. Please check and try again.
        </p>
      )}

      {isAuthenticated ? (
        <Link to="/dashboard">
          <button className={styles.butt}>Go to Dashboard</button>
        </Link>
      ) : (
        <Link to="/">
          <button className={styles.buttT}>Go to Home</button>
        </Link>
      )}
    </div>
  );
};

export default EmailSwap;
