import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "src/redux/slices/auth";
import { useParams, Link } from "react-router-dom";
import { selectIsAuthenticated } from "src/redux/slices/auth";

export const ConfirmEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await dispatch(verifyEmail(token));
        console.log(response.payload);
        if (response.payload.status === 200) {
          setValidToken(true);
        } else {
          setValidToken(false);
        }
      } catch (e) {
        console.log(e);
        setValidToken(false);
      }

      if (!isAuthenticated) {
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 5000);
      }
    };

    fetchData();
  }, [dispatch, token, isAuthenticated]);

  return (
    <div>
      {validToken ? (
        <h1 className={styles.style}>Thank You for Confirming Email</h1>
      ) : (
        <p>Oops could not verify email</p>
      )}

      {validToken && (
        <Link to="/auth/login">
          <button className={styles.butt}>Login</button>
        </Link>
      )}
    </div>
  );
};

export default ConfirmEmail;
