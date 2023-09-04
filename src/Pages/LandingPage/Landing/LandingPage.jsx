import React, { useEffect } from "react";
import styles from "./main.module.scss";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/Pages/LandingPage/Footer/Footer";

function LandingPage() {
  useEffect(() => {
    document.title = "The Happy Blog";
  }, []);

  return (
    <div className={styles.landingPage}>
      <AuthButtons />
      <h1 className={styles.yourClass}>the happy blog</h1>
      <BlogButtons />
      <ImageGallery />
      <Footer />
    </div>
  );
}

export default LandingPage;
