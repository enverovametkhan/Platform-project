import React from "react";
import "./ImageGallery.css";
import image1 from "../../Assets/image1.jpg";
import image2 from "../../Assets/image2.jpg";
import image3 from "../../Assets/image3.jpg";
import image4 from "../../Assets/image4.jpg";

class ImageGallery extends React.Component {
  render() {
    return (
      <div className="image-gallery">
        <div className="image-container">
          <img className="image" src={image1} alt="Image 1" />
          <div className="image-text">the happy blog</div>
        </div>
        <div className="image-container">
          <img className="image" src={image2} alt="Image 2" />
          <div className="image-text">the happy blog</div>
        </div>
        <div className="image-container">
          <img className="image" src={image3} alt="Image 3" />
          <div className="image-text">the happy blog</div>
        </div>
        <div className="image-container">
          <img className="image" src={image4} alt="Image 4" />
          <div className="image-text">the happy blog</div>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
