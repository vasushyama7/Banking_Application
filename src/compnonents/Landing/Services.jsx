import React from "react";
import WelZig from "../Images/welcomezigma.png";
import "./Services.css";

export default function Services() {
  return (
    <div className="ser-ctn-main">
      <div className="ser-left">
        <h1>Welcome To Zigma Bank</h1>
        <p>
          At Zigma Bank, we pride ourselves on being a leading provider of
          comprehensive banking services, delivering excellence across India and
          beyond. With a firm commitment to innovation, customer satisfaction,
          and community development, we are dedicated to meeting the diverse
          financial needs of individuals and businesses on a global scale.{" "}
        </p>

        <button>Know More</button>
      </div>

      <div className="ser-rit">
        <img src={WelZig} alt="" />
      </div>
    </div>
  );
}
