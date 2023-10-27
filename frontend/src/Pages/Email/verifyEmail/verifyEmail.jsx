import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { useDispatch } from "react-redux";
import { confirmEmailSwap } from "src/redux/slices/users";
import { useParams } from "react-router";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
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
        <h1 className={styles.Style}>Thank You for Confirming Email</h1>
      ) : (
        <p>The provided token is invalid. Please check and try again.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
