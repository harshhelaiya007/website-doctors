import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import DataCard from "../DataCard/DataCard";
import Button from "../Button/Button";
import ModelImageContext from "../Context/ModelImageContext";
import Model from "../Model/Model";
import "./Forms.css";

function Forms() {
  const [cardPositions, setCardPositions] = useState([0]);
  const [cardCount, setCardCount] = useState(1);
  const [activeCard, setActiveCard] = useState(1);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dataDoc, setDataDoc] = useState([]);

  const addCard = () => {
    if (cardCount < 15) {
      setDataDoc("");
      const newPosition = cardPositions[cardPositions.length - 1] + 18;
      setCardPositions((positions) => [...positions, newPosition]);
      setCardCount((count) => {
        const newCount = count + 1;
        setActiveCard(newCount);
        return newCount;
      });
      setCroppedImage(null);
    }
  };

  const removeCard = () => {
    if (cardCount > 1) {
      setCardPositions((positions) => positions.slice(0, -1));
      setCardCount(cardCount - 1);
      setActiveCard(activeCard - 1);
    }
  };

  const handleSidebarClick = (index) => {
    setActiveCard(index + 1);
  };

  useEffect(() => {
    var loaderEle = document.querySelector(".lds-dual-ring");
    loaderEle.classList.add("active");
    document.querySelector(".form-section.main").classList.add("dsp-none");
    document.querySelector(".header").classList.add("dsp-none");

    const userData = localStorage.getItem("userData");

    if (userData && userData !== "") {
      const parsedUserData = JSON.parse(userData);
      const userEmailId = parsedUserData.user.user.email;

      fetch("http://localhost:80/doctors")
        .then((response) => response.json())
        .then((data) => {
          const fetchedDoctorsData = data.doctors.filter(
            (doctorsData) => doctorsData.reference === userEmailId
          );
          var loaderEle = document.querySelector(".lds-dual-ring");
          loaderEle.classList.remove("active");
          document
            .querySelector(".form-section.main")
            .classList.remove("dsp-none");
          document.querySelector(".header").classList.remove("dsp-none");

          if (fetchedDoctorsData.length > 0) {
            localStorage.setItem(
              "dataLocal",
              JSON.stringify(fetchedDoctorsData)
            );
            setDataDoc(fetchedDoctorsData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const renderSidebar = () => {
    const sidebarItems = cardPositions.map((position, index) => {
      return (
        <div
          key={index}
          className={`select-item ${index + 1 === activeCard ? "active" : ""}`}
          onClick={() => handleSidebarClick(index)}
        >
          <Link to="#">{index + 1}</Link>
        </div>
      );
    });

    return (
      <div className={`sideBar-cardClone ${cardCount <= 1 ? "dsp-none" : ""}`}>
        {sidebarItems}
      </div>
    );
  };

  const renderCards = () => {
    const cards = cardPositions.map((position, index) => {
      return (
        <div
          key={index}
          className={`card-section ${index > 0 ? "cloned" : ""} ${
            index === 0 ? "first-ele" : ""
          } ${index === activeCard ? "comesForward" : ""}`}
          style={{ transform: `translateY(${position}px)` }}
          id={`card${index + 1}`}
        >
          <div className="btn-wrapper">
            <div className="add-btn-div" key={`add-${index}`} onClick={addCard}>
              <img
                src="./assets/image/add-btn.png"
                alt="Add Button"
                className="add-btn"
              />
            </div>
            <div
              className={`minus-btn-div${cardCount > 1 ? "" : " dsp-none"}`}
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
      );
    });

    return cards;
  };

  return (
    <>
      <div className="form-section main">
        <div className="form-section-inner">
          <Button
            className={`btn btn-secondary btn-lg btn-color filled-btn ${
              dataDoc.length > 0 ? "" : "dsp-none"
            }`}
            btnText={"Filled Data"}
          />
          <div className="sidebar-section">
            <div className="sidebar">{renderSidebar()}</div>
          </div>
          <div className="container card-section-wrapper">{renderCards()}</div>
        </div>
        <Model />
      </div>
      <DataCard renderData={dataDoc} />
    </>
  );
}

export default Forms;
