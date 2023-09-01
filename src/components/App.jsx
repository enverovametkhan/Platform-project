import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import ImageGallery from "src/components/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/components/Footer/Footer";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }]);

class App extends React.Component {
  render() {
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
}

export default App;
