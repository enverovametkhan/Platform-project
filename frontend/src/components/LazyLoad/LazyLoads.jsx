import { lazy } from "react";

const LandingPage = lazy(() =>
  import("src/Pages/LandingPage/Landing/LandingPage").then((module) => ({
    default: module.LandingPage,
  }))
);
const LoginPage = lazy(() =>
  import("src/Pages/AuthPages/LogInPage/LoginPage/LoginPage").then(
    (module) => ({
      default: module.LoginPage,
    })
  )
);
const SignupPage = lazy(() =>
  import("src/Pages/AuthPages/SignupPage/SignupPage").then((module) => ({
    default: module.SignupPage,
  }))
);
const ResetPassPage = lazy(() =>
  import("src/Pages/AuthPages/ResetPass/ResetPassPage").then((module) => ({
    default: module.ResetPassPage,
  }))
);
const ConfirmNewPassPage = lazy(() =>
  import("src/Pages/AuthPages/ConfirmNewPass/ConfirmNewPassPage").then(
    (module) => ({ default: module.ConfirmNewPassPage })
  )
);
const ConfirmEmail = lazy(() =>
  import("src/Pages/Email/confirmEmail/confirmEmail").then((module) => ({
    default: module.ConfirmEmail,
  }))
);
const VerifyEmail = lazy(() =>
  import("src/Pages/Email/verifyEmail/verifyEmail").then((module) => ({
    default: module.VerifyEmail,
  }))
);
const Blog = lazy(() =>
  import("src/Pages/BlogPages/Blog/Blog").then((module) => ({
    default: module.Blog,
  }))
);
const NavigationBar = lazy(() =>
  import("src/components/NavigationBar/NavigationBar").then((module) => ({
    default: module.NavigationBar,
  }))
);
const CreateBlog = lazy(() =>
  import("src/Pages/BlogPages/CreateBlog/CreateBlog").then((module) => ({
    default: module.CreateBlog,
  }))
);
const MyBlogs = lazy(() =>
  import("src/Pages/BlogPages/MyBlogs/MyBlogs").then((module) => ({
    default: module.MyBlogs,
  }))
);
const EditBlog = lazy(() =>
  import("src/Pages/BlogPages/EditBlog/EditBLog").then((module) => ({
    default: module.EditBlog,
  }))
);

const MyAccount = lazy(() =>
  import("src/Pages/BlogPages/MyAccount/MyAccount").then((module) => ({
    default: module.MyAccount,
  }))
);

export {
  LandingPage,
  LoginPage,
  SignupPage,
  ResetPassPage,
  ConfirmNewPassPage,
  ConfirmEmail,
  VerifyEmail,
  Blog,
  NavigationBar,
  CreateBlog,
  MyBlogs,
  EditBlog,
  MyAccount,
};
