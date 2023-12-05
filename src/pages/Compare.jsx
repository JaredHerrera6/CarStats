import React from "react";
import { useState, useEffect } from "react";
import "../index.css";

function Compare() {
  const [cYears, setcYears] = useState([]);

  fetch("?callback=?&cmd=getYears")
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Error Reading data " + err);
    });

  return (
    <div className="carstats-container">
      <div className="car-search-title">
        <p>Compare</p>
      </div>
      <div className="page-description"></div>
    </div>
  );
}
export default Compare;
