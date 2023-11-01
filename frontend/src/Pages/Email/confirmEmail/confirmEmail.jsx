import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "src/redux/slices/auth";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ConfirmEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
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
        navigate("/auth/login");
      }
    };

    fetchData();
  }, [dispatch, token, isAuthenticated, navigate]);

  return (
    <div>
      {validToken ? (
        <h1 className={styles.Style}>Thank You for Confirming Email</h1>
      ) : (
        <p>The provided token is invalid. Please check and try again.</p>
      )}

      {validToken && (
        <Link to="/auth/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default ConfirmEmail;
