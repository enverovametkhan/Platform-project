import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { loginUser, logoutUser, signupUser } from "src/redux/slices/auth";
import { setCurrentUser } from "src/redux/slices/users";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = async (formData, setFormData) => {
    if (isAuthenticated) {
      console.log("You are already authenticated.");
      return;
    }

    try {
      const response = await dispatch(loginUser(formData));

      const userData = {
        id: response.payload.userId,
        email: response.payload.email,
        username: response.payload.username,
      };
      console.log(userData);
      await dispatch(setCurrentUser(userData));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUp = async (formData, setFormData) => {
    if (isAuthenticated) {
      console.log("You are already authenticated.");
      return;
    }

    try {
      if (formData.password !== formData.confirmedPassword) {
        console.log("Password and Confirm Password do not match");
        return;
      }

      const response = await dispatch(signupUser(formData));

      console.log(response.payload);
    } catch (error) {
      console.error("Signup Error:", error);
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/auth/login");
    } else if (isAuthenticated && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleSignUp, handleLogout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
