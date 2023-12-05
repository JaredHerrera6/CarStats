import React from "react";

function About() {
  return (
    <div className="about-container">
      <div className="about-background">
        <p className="top-about-text">About</p>
      </div>
      <div className="about-description">
        <p className="description-title">About The Website</p>
        <p>
          Mobile Stats is intended to aid current and future vehicle buyers to
          find their their dream Vehicle.
        </p>
        <p>
          Mobile Stats has an easy to use interface that allows users to
          quickly, easily, and effectively retrieve several specifications of a
          wide variety of vehicles
        </p>
        <p>
          Car Stats Allows Users to find the statistics of a single vehcile,
          while the compare page allows users to search and compare the specs of
          two different vehicles side to side. The Rankings page allows users to
          Find the Best Ranked vehicle of a spec form a specific Year.
        </p>
      </div>
    </div>
  );
}

export default About;
