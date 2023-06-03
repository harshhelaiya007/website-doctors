import React from "react";
import "./DataCard.css";

function DataCard() {
  let renderDataLocal = localStorage.getItem("dataLocal");
  if (renderDataLocal !== "" || renderDataLocal == null) {
    renderDataLocal = JSON.parse(localStorage.getItem("dataLocal"));
  }

  const localDataFn = () => {
    if (renderDataLocal && renderDataLocal.length > 0) {
      return renderDataLocal.map((data, index) => (
        <div key={index} className="card dataCardSection">
          <div className="card-img-section">
            <img
              className="card-img-top img-section"
              src={
                "http://ec2-65-2-116-251.ap-south-1.compute.amazonaws.com/image/" +
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
        </div>
      ));
    } else {
      return <div className="noDataMessage">No data available</div>;
    }
  };

  return (
    <div
      className={`cardSection_wrapper ${
        renderDataLocal.length > 0 ? "" : "dsp-none"
      }`}
    >
      {localDataFn()}
    </div>
  );
}

export default DataCard;
