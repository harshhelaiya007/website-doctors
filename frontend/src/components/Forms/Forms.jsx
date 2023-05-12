import { React, useState, useRef, useEffect } from "react";
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

  let [croppedImage, setCroppedImage] = useState(null);
  const [dataDoc, setdataDoc] = useState([]);
  const imageRef = useRef(null);

  const addCard = () => {
    if (cardCount < 15) {
      setdataDoc("");
      const newPosition = cardPositions[cardPositions.length - 1] + 18;
      setCardPositions([...cardPositions, newPosition]);
      setCardCount(cardCount + 1);
      setActiveCard(cardCount);
      setCroppedImage(null);
    }
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
    responsive: true,
    crop: () => {
      const canvas = cropper.getCroppedCanvas();
      setCroppedImage(canvas.toDataURL());
    },
  };

  let cropper;

  const onImageLoaded = (event) => {
    cropper = new Cropper(event.target, cropperOptions);
  };

  useEffect(() => {
    var userData = localStorage.getItem("userData");

    if (!userData == "" && userData) {
      userData = JSON.parse(localStorage.getItem("userData"));
    }

    var userEmailId = userData.user.user.email;

    fetch("/doctors")
      .then((response) => response.json())
      .then((data) => {
        const fetchedDoctorsData = data.doctors.filter(
          (doctorsData) => doctorsData.reference === userEmailId
        );
        setdataDoc(fetchedDoctorsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (dataDoc.length > 0) {
      dataDoc.forEach(function (data) {
        const newPosition = cardPositions[cardPositions.length - 1] + 18;
        setCardPositions([...cardPositions, newPosition]);
        setCardCount(cardCount + 1);
        setActiveCard(cardCount);

        let doctorsCardId = data.cardId;
        var doctorRenderCard = document.querySelector(
          `#card${doctorsCardId - 1}`
        );

        var doctorNameRender = doctorRenderCard.querySelector(
          `#inputDoctorName-${doctorsCardId}`
        );
        var doctorRegionRender = doctorRenderCard.querySelector(
          `#inputRegion-${doctorsCardId}`
        );
        var doctorHQRender = doctorRenderCard.querySelector(
          `#inputHQ-${doctorsCardId}`
        );
        var doctorFsoNameRender = doctorRenderCard.querySelector(
          `#inputFSOName-${doctorsCardId}`
        );

        doctorNameRender.value = data.name;
        doctorRegionRender.value = data.region;
        doctorHQRender.value = data.hq;
        doctorFsoNameRender.value = data.fsoname;

        doctorNameRender.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
        doctorRegionRender.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
        doctorHQRender.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
        doctorFsoNameRender.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
        doctorNameRender.parentElement.parentNode.classList.add("valid");
        doctorRegionRender.parentElement.parentNode.classList.add("valid");
        doctorHQRender.parentElement.parentNode.classList.add("valid");
        doctorFsoNameRender.parentElement.parentNode.classList.add("valid");

        // image rendering logic
        var renderImage = doctorRenderCard.querySelector(
          `#image-section-${doctorsCardId} img`
        );
        var cardImageSection =
          doctorRenderCard.querySelector(".card-section-img");
        var imagePTag = doctorRenderCard.querySelector(".info-p");
        if (data.image) {
          imagePTag.classList.add("dsp-none");
        } else { 
          imagePTag.classList.remove("dsp-none");
        }
        cardImageSection.classList.add("inputFileUpload");
        renderImage.src = `/image/${data.image}`;
        renderImage.classList.remove("dsp-none");


        var minusBtn = doctorRenderCard.querySelector(".minus-btn-div");
        minusBtn.classList.add("pointer-none");
      });
    }
  }, [dataDoc]);

  return (
    <>
      <div className="form-section main">
        <div className="form-section-inner">
          <div
            className={`sideBar-cardClone ${cardCount <= 1 ? "dsp-none" : ""}`}
          >
            {dataDoc.length > 0
              ? dataDoc.map((data, index) => (
                  <div
                    key={index}
                    className={`select-item ${
                      index === activeCard ? "active" : ""
                    }`}
                    onClick={() => handleSidebarClick(index)}
                  >
                    <Link to="#">{index + 1}</Link>
                  </div>
                ))
              : cardPositions.map((position, index) => (
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
            {dataDoc.length > 0
              ? dataDoc.map((data, index) => {
                console.log('this working')
                  return (
                    <div
                      key={index}
                      id={"card" + index}
                      className={`card-section ${index > 0 ? "cloned" : ""} ${
                        index === 0 ? "first-ele" : ""
                      } ${index === activeCard ? "comesForward" : ""}`}
                      style={{
                        transform: `translateY(${cardPositions[index]}px)`,
                      }}
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
                      <div className="heading-title">
                        <h2>
                          Doctors Details Form{" "}
                          <span className="form-number">{index + 1}</span>
                        </h2>
                      </div>
                      <div className="card-section-body">
                        {/* Render input fields here */}
                        <ModelImageContext.Provider
                          value={{
                            image,
                            setImage,
                            croppedImage,
                            cardCount,
                            cardPositions,
                            setCardCount,
                            setCardPositions,
                            setActiveCard,
                          }}
                        >
                          <Card
                            keyId={index + 1}
                            key={index}
                            renderData={data}
                          />
                        </ModelImageContext.Provider>
                      </div>
                    </div>
                  );
                })
              : cardPositions.map((position, index) => (
                  <div
                    key={index}
                    className={`card-section ${index > 0 ? "cloned" : ""} ${
                      index === 0 ? "first-ele" : ""
                    } ${index === activeCard ? "comesForward" : ""}`}
                    style={{ transform: `translateY(${position}px)` }}
                    id={"card" + index}
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
                        value={{
                          image,
                          setImage,
                          croppedImage,
                          cardCount,
                          cardPositions,
                          setCardCount,
                          setCardPositions,
                          setActiveCard,
                        }}
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
