import React from "react";
import "./App.css";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import ImageGallery from "src/components/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import { Footer } from "src/components/Footer/Footer";

function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>the happy blog</h1>
      </header>
    </div>
  );
}

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
