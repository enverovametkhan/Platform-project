import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import {
  LandingPage,
  SignupPage,
  LoginPage,
  ResetPassPage,
  ConfirmNewPassPage,
  ConfirmEmail,
  VerifyEmail,
  NavigationBar,
  Blog,
  MyBlogs,
  CreateBlog,
  EditBlog,
  MyAccount,
} from "src/components/LazyLoad";
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
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route path="/resetpass" element={<ResetPassPage />} />
              <Route path="/confirmpass" element={<ConfirmNewPassPage />} />
              <Route path="/confirmemail/:token" element={<ConfirmEmail />} />
              <Route path="/verifyemail/:token" element={<VerifyEmail />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/dashboard/*" element={<NavigationBar />}>
                <Route path="createblog" element={<CreateBlog />} />
                <Route path="myblogs/:userId" element={<MyBlogs />} />
                <Route path="editblog" element={<EditBlog />} />
                <Route path="myaccount" element={<MyAccount />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
