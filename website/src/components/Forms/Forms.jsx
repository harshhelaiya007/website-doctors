import { React, useState, useEffect } from "react";
import "./Forms.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

function Forms() {
  const [cardPositions, setCardPositions] = useState([0]);
  const [cardCount, setCardCount] = useState(1);
  const [activeCard, setActiveCard] = useState(0);

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

  return (
    <>
      <div className="form-section main">
        <div className="form-section-inner">
          <div className="sideBar-cardClone">
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
                key={`card-${position}`}
                className={`card-section ${index > 0 ? "cloned" : ""} ${
                  index === 0 ? "first-ele" : ""
                }`}
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
                  <Card />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
