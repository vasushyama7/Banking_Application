import React from "react";
import HeroImg from "../Images/heroimg.gif";
import "./Hero.css";
import AmazonLogo from '../Images/Amazonlogo.png';
import Paytm from '../Images/Paytm_logo.png';
import Microsoft from '../Images/Microsoft.webp';
import Salesforce from '../Images/Salesforce.png';
import Techwave from '../Images/Techwave.png';
import Vts from '../Images/VTS.png'
import './Scroll.css';

export default function Hero() {
  return (
    <div className="hero-all">
      <div className="hero-main-ctn">
        <div className="hero-cnt">
          <h1>ZIGMA</h1>
          <p className="hero-ctn-p">The one and only Bank</p>
          <h3>Safe and secure friend to transfer your money</h3>
          <button><a href="/register">Open Account</a></button>
        </div>

        <div className="hero-img">
          <img src={HeroImg} alt="" />
        </div>
      </div>

      <div class="barends">
        <p>Trusted by the world’s leading organizations ↘︎</p>
        <img
          src={Vts}
          alt=""
        />
        <img
          src={AmazonLogo}
          alt=""
        />
        <img
          src={Paytm}
          alt=""
        />
        <img
          src={Microsoft}
          alt=""
        />
        <img
          src={Salesforce}
          alt=""
        />
        <img
          src={Techwave}
          alt=""
        />
      </div>

   

      
      
    </div>
  );
}
