import { React, useState, useRef } from "react";
import "./Forms.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import ModelImageContext from "../Context/ModelImageContext";
import Model from "../Model/Model";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

function Forms() {
  const [cardPositions, setCardPositions] = useState([0]);
  const [cardCount, setCardCount] = useState(1);
  const [activeCard, setActiveCard] = useState(0);

  const [image, setImage] = useState(null);

  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);

  const addCard = () => {
    const newPosition = cardPositions[cardPositions.length - 1] + 18;
    setCardPositions([...cardPositions, newPosition]);
    setCardCount(cardCount + 1);
    setActiveCard(cardCount);
  };

  const removeCard = () => {
    if (cardCount > 1) {
      const newPositions = [...cardPositions];
      newPositions.pop();
      setCardPositions(newPositions);
      setCardCount(cardCount - 1);
      setActiveCard(activeCard - 1);
    }
  };

  const handleSidebarClick = (index) => {
    setActiveCard(index);
  };

  const cropperOptions = {
    aspectRatio: 16 / 9,
    width: 328,
    height: 399,
    viewMode: 0,
    minContainerWidth: 618,
    minContainerHeight: 458,
    minCanvasWidth: 618,
    minCanvasHeight: 458,
    minCropBoxWidth: 100,
    minCropBoxHeight: 100,
    background: true,
    movable: true,
    zoomable: false,
    cropBoxResizable: true,
    crop: () => {
      const canvas = cropper.getCroppedCanvas();
      setCroppedImage(canvas.toDataURL());
    },
  };

  let cropper;

  const onImageLoaded = (event) => {
    cropper = new Cropper(event.target, cropperOptions);
  };

  return (
    <>
      <div className="form-section main">
        <div className="form-section-inner">
          <div
            className={`sideBar-cardClone ${cardCount <= 1 ? "dsp-none" : ""}`}
          >
            {cardPositions.map((position, index) => (
              <div
                key={index}
                className={`select-item ${
                  index === activeCard ? "active" : ""
                }`}
                onClick={() => handleSidebarClick(index)}
              >
                <Link to="#">{index + 1}</Link>
              </div>
            ))}
          </div>
          <div className="container card-section-wrapper">
            {cardPositions.map((position, index) => (
              <div
                key={index}
                className={`card-section ${index > 0 ? "cloned" : ""} ${
                  index === 0 ? "first-ele" : ""
                } ${index === activeCard ? "comesForward" : ""}`}
                style={{ transform: `translateY(${position}px)` }}
                id={index}
              >
                <div className="btn-wrapper">
                  <div
                    className="add-btn-div"
                    key={`add-${index}`}
                    onClick={addCard}
                  >
                    <img
                      src="./assets/image/add-btn.png"
                      alt="Add Button"
                      className="add-btn"
                    />
                  </div>
                  <div
                    className={`minus-btn-div${
                      cardCount > 1 ? "" : " dsp-none"
                    }`}
                    key={`minus-${index}`}
                    onClick={removeCard}
                  >
                    <img
                      src="./assets/image/minus-btn.png"
                      alt="Minus Button"
                      className="minus-btn"
                    />
                  </div>
                </div>
                {/* Card content goes here */}
                <div className="heading-title">
                  <h2>
                    Doctors Details Form{" "}
                    <span className="form-number">{index + 1}</span>
                  </h2>
                </div>
                <div className="card-section-body">
                  {/* Render input fields here */}
                  <ModelImageContext.Provider
                    value={{ image, setImage, croppedImage }}
                  >
                    <Card keyId={index + 1} key={index} />
                  </ModelImageContext.Provider>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Model
        uploadImageData={image}
        modelRef={imageRef}
        onImageLoadCropper={onImageLoaded}
      />
    </>
  );
}

export default Forms;
