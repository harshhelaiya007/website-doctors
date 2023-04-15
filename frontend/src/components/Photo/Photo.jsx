import React from "react";
import "./Photo.css";

function Photo({ UploadImage, indexId }) {

  return (
    <div className="image-section" id={indexId}>
      <img
        src={`${UploadImage ? UploadImage : ""}`}
        className={`photo-upload-img ${!UploadImage ? "dsp-none" : ""}`}
        alt="doctor-profile"
      />
    </div>
  );
}

export default Photo;
