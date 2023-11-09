import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router";

export function ImageUploader({ formData, setFormData }) {
  const handlePicChange = (event) => {
    const files = event.target.files;
    if (files.length === 0) {
      // No file selected
      return;
    }

    const file = files[0];
    if (!isFileValid(file)) {
      // Invalid file type or size
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setFormData({ ...formData, image: base64Data });
    };
    reader.readAsDataURL(file);
  };

  const isFileValid = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      // Invalid file type
      console.log("Invalid type, only image/jpeg", "image/png allowed");
      return false;
    }

    if (file.size > maxSize) {
      // File size exceeds the maximum limit
      console.log("Maximum file size is 5MB");
      return false;
    }

    return true;
  };

  return (
    <div className={styles["image-uploader"]}>
      <label htmlFor="image">Image:</label>
      <input type="file" id="image" name="image" onChange={handlePicChange} />
      {formData.image && <img src={formData.image} alt="Selected Image" />}
    </div>
  );
}
