import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import {
  googleSignIn,
  loginUser,
  logoutUser,
  signupUser,
} from "src/redux/slices/auth";
import { setCurrentUser } from "src/redux/slices/users";
import { selectIsAuthenticated } from "src/redux/slices/auth";
import { selectForcedLogout } from "src/redux/slices/auth";
import { setClearState } from "src/redux/slices/auth";
import { persistor } from "src/redux/store";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const forcedLogout = useSelector(selectForcedLogout);

  const handleLogin = async (formData, setFormData) => {
    try {
      const response = await dispatch(loginUser(formData));

      if (response.payload) {
        const userData = {
          id: response.payload.userId,
          email: response.payload.email,
          username: response.payload.username,
        };
        console.log(response.payload);
        await dispatch(setCurrentUser(userData));
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Login Error: Invalid response data");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleGoogleSignIn = async (credential) => {
    try {
      console.log(credential);
      const response = await dispatch(googleSignIn(credential));
      console.log(response);
      const userData = {
        id: response.payload.userId,
        email: response.payload.email,
        username: response.payload.username,
      };

      await dispatch(setCurrentUser(userData));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("googleSignIn Error:", error);
    }
  };

  const handleSignUp = async (formData, setFormData) => {
    try {
      const response = await dispatch(signupUser(formData, setFormData));

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
      const response = await dispatch(logoutUser());
      if (response.error) {
        const customError = new Error("Error trying to logout");
        customError.response = response;
        throw customError;
      }
      console.log(response.payload);
      await dispatch(setCurrentUser(""));
    } catch (error) {
      console.error("Logout Error:", error);
      await dispatch(setClearState());
      await dispatch(setCurrentUser(""));
    }
    navigate("/", { replace: true });
  };

  const routeProtection = {
    restrictedWhenAuth: ["/auth/login", "/auth/signup", "/auth/resetpass"],
    requiresAuthentication: ["/dashboard"],
  };

  useEffect(() => {
    const isAllowedWhenAuth = routeProtection.restrictedWhenAuth.some(
      (route) => {
        if (typeof route === "string") {
          return route === location.pathname;
        } else if (route instanceof RegExp) {
          return route.test(location.pathname);
        } else {
          return false;
        }
      }
    );

    const isRequiringAuthRoute = routeProtection.requiresAuthentication.some(
      (route) => location.pathname.startsWith(route)
    );
    const isNoMatchRoute = !isAllowedWhenAuth && !isRequiringAuthRoute;

    if (!isAuthenticated && !isAllowedWhenAuth && !isNoMatchRoute) {
      navigate("/auth/login");
    } else if (isAuthenticated && !isRequiringAuthRoute && !isNoMatchRoute) {
      navigate("/dashboard");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (forcedLogout) {
      handleLogout();
    }
  }, [forcedLogout]);

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleSignUp, handleLogout, handleGoogleSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
