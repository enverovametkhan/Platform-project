import React, { useEffect } from "react";
import BlogButtons from "src/components/LandingPage/BlogButtons/BlogButtons";
import ImageGallery from "src/components/LandingPage//ImageGallery/ImageGallery";
import AuthButtons from "src/components/LandingPage/AuthButtons/AuthButtons";
import Footer from "src/components/LandingPage/Footer/Footer";
import Header from "src/components/LandingPage/header";
import "./LandingPage.css";

function LandingPage() {
  useEffect(() => {
    document.title = "The Happy Blog";
  }, []);

  return (
    <div className="landing-page">
      <AuthButtons />
      <Header />
      <BlogButtons />
      <ImageGallery />
      <Footer />
    </div>
  );
}

export default LandingPage;
