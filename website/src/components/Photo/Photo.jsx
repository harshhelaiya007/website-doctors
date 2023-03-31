import React from "react";
import "./Photo.css";

function Photo({ UploadImage, uploadClick }) {
  return (
    <div className="image-section">
      <img
        src=''
        className={`${!UploadImage ? "dsp-none" : ""}`}
        alt="doctor-profile"
      />
    </div>
  );
}

export default Photo;
