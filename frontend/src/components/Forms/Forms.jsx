import React, { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import DataCard from '../DataCard/DataCard';
import Button from '../Button/Button';
import ModelImageContext from '../Context/ModelImageContext';
import filledDataContext from '../Context/filledDataContext';
import Model from '../Model/Model';
import './Forms.css';

function Forms() {
  // Create the context

  const [cardPositions, setCardPositions] = useState([0]);
  const [cardCount, setCardCount] = useState(1);
  const [activeCard, setActiveCard] = useState(1);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dataDoc, setDataDoc] = useState([]);
  const [filledData, setFilledData] = useState(false);

  const [refreshData, setRefreshData] = useState(true);

  const handleRefreshDataStats = () => {
    setRefreshData(!refreshData);
  };

  const addCard = () => {
    let getCardLimit = localStorage.getItem('dataLimit');
    let cardLimit;
    if (getCardLimit != '') {
      cardLimit = 15 - getCardLimit;
    } else {
      cardLimit = 15;
    }
    if (cardCount < cardLimit) {
      const newPosition = cardPositions[cardPositions.length - 1] + 18;
      setCardPositions((positions) => [...positions, newPosition]);
      setCardCount((count) => {
        const newCount = count + 1;
        setActiveCard(newCount);
        return newCount;
      });
      setCroppedImage(null);
    }
    if (cardCount == cardLimit) {
      alert('Reached Card Limit 15');
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
    var loaderEle = document.querySelector('.lds-dual-ring');
    loaderEle.classList.add('active');
    document.querySelector('.form-section.main').classList.add('dsp-none');
    document.querySelector('.header').classList.add('dsp-none');

    const userData = localStorage.getItem('userData');

    if (userData && userData !== '') {
      const parsedUserData = JSON.parse(userData);
      const userEmailId = parsedUserData.user.user.email;

      fetch('/doctors')
        .then((response) => response.json())
        .then((data) => {
          const fetchedDoctorsData = data.doctors.filter(
            (doctorsData) => doctorsData.reference === userEmailId
          );
          var loaderEle = document.querySelector('.lds-dual-ring');
          loaderEle.classList.remove('active');
          document
            .querySelector('.form-section.main')
            .classList.remove('dsp-none');
          document.querySelector('.header').classList.remove('dsp-none');

          if (fetchedDoctorsData.length > 0) {
            localStorage.setItem(
              'dataLocal',
              JSON.stringify(fetchedDoctorsData)
            );
            localStorage.setItem('dataLimit', fetchedDoctorsData.length);
            setDataDoc(fetchedDoctorsData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [refreshData]);

  const renderSidebar = () => {
    const sidebarItems = cardPositions.map((position, index) => {
      return (
        <div
          key={index}
          className={`select-item ${index + 1 === activeCard ? 'active' : ''}`}
          onClick={() => handleSidebarClick(index)}
        >
          <Link to="#">{index + 1}</Link>
        </div>
      );
    });

    return (
      <div className={`sideBar-cardClone ${cardCount <= 1 ? 'dsp-none' : ''}`}>
        {sidebarItems}
      </div>
    );
  };

  const renderCards = () => {
    const cards = cardPositions.map((position, index) => {
      return (
        <div
          key={index}
          className={`card-section ${index > 0 ? 'cloned' : ''} ${
            index === 0 ? 'first-ele' : ''
          } ${index === activeCard ? 'comesForward' : ''}`}
          style={{ transform: `translateY(${position}px)` }}
          id={`card${index + 1}`}
        >
          <div className="btn-wrapper"></div>
          <div className="heading-title">
            <h2>
              Doctors Details Form{' '}
              {/* <span className="form-number">{index + 1}</span> */}
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
              <Card
                keyId={index + 1}
                key={index}
                disbledBtn={dataDoc.length >= 15}
                handleRefreshDataStats={handleRefreshDataStats}
              />
            </ModelImageContext.Provider>
          </div>
        </div>
      );
    });

    return cards;
  };

  const handleSetData = () => {
    setFilledData(!filledData);
  };

  return (
    <>
      <div className={`form-section main ${filledData ? 'dsp-none' : ''}`}>
        <Button
          className={`btn btn-secondary btn-lg btn-color filled-btn ${
            dataDoc.length > 0 ? '' : 'dsp-none'
          }`}
          btnText={'Filled Data'}
          onClick={handleSetData}
        />
        <div className="form-section-inner">
          <div className="sidebar-section">
            <div className="sidebar">{renderSidebar()}</div>
          </div>
          <div className="container card-section-wrapper">{renderCards()}</div>
        </div>
        <Model />
      </div>
      <filledDataContext.Provider value={{ filledData, setFilledData }}>
        <DataCard renderData={dataDoc} checkNow={filledData} />
      </filledDataContext.Provider>
    </>
  );
}

export default Forms;
