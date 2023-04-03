import React from "react";

function Loader({ loaderActive }) {
  return (
    <div className={`lds-dual-ring ${loaderActive ? "active" : ""}`}></div>
  );
}

export default Loader;
