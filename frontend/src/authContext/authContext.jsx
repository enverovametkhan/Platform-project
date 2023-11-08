import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { loginUser, logoutUser, signupUser } from "src/redux/slices/auth";
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

  const handleSignUp = async (formData, setFormData) => {
    try {
      if (formData.password !== formData.confirmedPassword) {
        console.log("Password and Confirm Password do not match");
        return;
      }

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
    console.log("Outside");
    if (forcedLogout) {
      console.log("Inside");
      handleLogout();
    }
  }, [forcedLogout]);

  return (
    <AuthContext.Provider value={{ handleLogin, handleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
