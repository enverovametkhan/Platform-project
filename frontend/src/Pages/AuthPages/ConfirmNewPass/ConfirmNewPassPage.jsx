import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styles from "./main.module.scss";
import {
  resetPassword,
  checkResetPasswordToken,
} from "src/redux/slices/resetPass";
import { logoutUser } from "src/redux/slices/auth";
import { selectIsAuthenticated } from "src/redux/slices/auth";

// export const ConfirmNewPassPage = () => {
//   const dispatch = useDispatch();
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     password: "",
//     confirmedPassword: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await dispatch(checkResetPasswordToken(token));
//         console.log(response);
//         if (response.payload.status !== 200) {
//           console.error("Invalid or expired token. Please request a new one.");

//           await dispatch(logoutUser());
//           navigate("/");
//         }
//       } catch (e) {
//         console.error(
//           "An error occurred while checking the token. Please try again."
//         );
//       }
//     };
//     fetchData();
//   }, [dispatch, token, navigate]);

//   const handleResetPassword = async () => {
//     try {
//       if (formData.password.length < 6) {
//         console.error("Password must be at least 6 characters long.");
//         return;
//       }

//       if (formData.confirmedPassword.length < 6) {
//         console.error("Confirmed password must be at least 6 characters long.");
//         return;
//       }

//       if (formData.password === formData.confirmedPassword) {
//         const payload = {
//           passwordData: {
//             password: formData.password,
//             confirmedPassword: formData.confirmedPassword,
//           },
//           token,
//         };
//         console.log(payload);
//         const response = await dispatch(resetPassword(payload));
//         console.log(response.payload);
//         if (response.payload.status === 200) {
//           navigate("/auth/login");
//         } else {
//           console.error(
//             "An error occurred while resetting the password. Please try again."
//           );
//         }
//       } else {
//         console.error("Passwords do not match.");
//       }
//     } catch (error) {
//       console.error("An error occurred. Please try again.");
//     }
//   };

export function ConfirmNewPassPage() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    password: "",
    confirmedPassword: "",
  });
  const [finishedForm, setFinishedForm] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await dispatch(checkResetPasswordToken(token));

        if (response.error) {
          navigate("/");
        }
      } catch (e) {
        console.log("ERROR", e);
        navigate("/");
      }
    };
    fetchData();
  }, [dispatch, navigate, token]);

  const handleResetPassword = async () => {
    try {
      if (
        formData.password.length < 6 ||
        formData.confirmedPassword.length < 6
      ) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      if (formData.password === formData.confirmedPassword) {
        let payload = {
          passwordData: {
            password: formData.password,
            confirmedPassword: formData.confirmedPassword,
          },
          token,
        };
        let response = await dispatch(resetPassword(payload));

        if (response.error) {
          throw new Error("An error occurred when handling set new password");
        }
        setFinishedForm(true);

        setTimeout(() => {
          if (isAuthenticated) {
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
        }, 3000);

        console.log("Password reset successful!");
      } else {
        alert("Passwords do not match");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.confirmPage}>
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
          minLength="6"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmedPassword" className={styles.myLabel}>
          Confirm new password
        </label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={formData.confirmedPassword}
          minLength="6"
          onChange={handleInputChange}
        />
      </div>

      <button className={styles.confirmBut} onClick={handleResetPassword}>
        Confirm new Password
      </button>
    </div>
  );
}
