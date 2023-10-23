import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "src/Pages/LandingPage/Landing/LandingPage";
import SignupPage from "src/Pages/AuthPages/SignupPage/SignupPage";
import LoginPage from "src/Pages/AuthPages/LogInPage/LoginPage/LoginPage";
import ResetPassPage from "src/Pages/AuthPages/ResetPass/ResetPassPage";
import ConfirmNewPassPage from "src/Pages/AuthPages/ConfirmNewPass/ConfirmNewPassPage";
import NavigationBar from "src/components/NavigationBar/NavigationBar";
import Blog from "src/Pages/BlogPages/Blog/Blog";
import MyBlogs from "src/Pages/BlogPages/MyBlogs/MyBlogs";
import BlogComponents from "src/components/BlogComponents/BlogComponents";
import CreateBlog from "src/Pages/BlogPages/CreateBlog/CreateBlog";
import EditBlog from "src/Pages/BlogPages/EditBlog/EditBLog";
import MyAccount from "src/Pages/BlogPages/MyAccount/MyAccount";
import PageNotFound from "src/components/PageNotFound/PageNotFound";

function App() {
  useEffect(() => {
    console.log("App component mounted");

    return () => {
      console.log("App component unmounted");
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resetpass" element={<ResetPassPage />} />
          <Route path="/confirmpass" element={<ConfirmNewPassPage />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogcomponents" element={<BlogComponents />} />
          <Route path="/dashboard/*" element={<NavigationBar />}>
            <Route path="createblog" element={<CreateBlog />} />
            <Route path="myblogs/:userId" element={<MyBlogs />} />
            <Route path="editblog" element={<EditBlog />} />
            <Route path="myaccount" element={<MyAccount />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
