import React from "react";
import "./Photo.css";

function Photo({ UploadImage }) {
  return (
    <div className="image-section">
      <img
        src={`${UploadImage ? UploadImage : ""}`}
        className={`photo-upload-img ${!UploadImage ? "dsp-none" : ""}`}
        alt="doctor-profile"
      />
    </div>
  );
}

export default Photo;
