import { React, useContext } from "react";
import "./DataCard.css";
import axios from "axios";
import Button from "../Button/Button";
import filledDataContext from "../Context/filledDataContext";

function DataCard({ checkNow }) {
  const { filledData, setFilledData } = useContext(filledDataContext);

  let renderDataLocal = localStorage.getItem("dataLocal");
  if (renderDataLocal !== "" || renderDataLocal == null) {
    renderDataLocal = JSON.parse(localStorage.getItem("dataLocal"));
  }

  const handleDeleteClick = (data) => {
    axios
      .delete(`/doctors/${data._id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Retry Deleting Data");
      });
      window.location.reload();
  };

  const localDataFn = () => {
    if (renderDataLocal && renderDataLocal.length > 0) {
      return renderDataLocal.map((data, index) => (
        <div key={index} className="card dataCardSection">
          <div className="card-img-section" data-id={data._id}>
            <img
              className="card-img-top img-section"
              src={
                "/image/" +
                data.image
              }
              alt={data.name}
            />
          </div>
          <div className="card-body">
            <p className="name">
              Doctor Name: <span>{data.name}</span>
            </p>
            <p className="region">
              Region: <span>{data.region}</span>
            </p>
            <p className="hq">
              HQ: <span>{data.hq}</span>
            </p>
            <p className="fsoName">
              FSO Name: <span>{data.fsoname}</span>
            </p>
          </div>
          <Button
            className="btn btn-primary btn-lg delete-btn"
            type="submit"
            btnText={"Delete"}
            onClick={() => handleDeleteClick(data)}
          />
        </div>
      ));
    } else {
      return <div className="noDataMessage">No data available</div>;
    }
  };

  const handleBack = () => {
    setFilledData(!filledData);
  };

  return (
    <>
      <Button
        className={`btn btn-secondary btn-lg btn-color back-btn ${
          checkNow ? "" : "dsp-none"
        }`}
        btnText={"Back"}
        onClick={handleBack}
      />
      <div className={`cardSection_wrapper ${checkNow ? "" : "dsp-none"}`}>
        {localDataFn()}
      </div>
    </>
  );
}

export default DataCard;
