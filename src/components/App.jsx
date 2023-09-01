import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "./LandingPage/LandingPage";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import ImageGallery from "src/components/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/components/Footer/Footer";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }]);

function App() {
  useEffect(() => {
    console.log("App component mounted");

    return () => {
      console.log("App component unmounted");
    };
  }, []);

  return (
    <div className="app">
      <AuthButtons />
      <LandingPage />
      <BlogButtons />
      <ImageGallery />
      <Footer />
    </div>
  );
}

export default App;
