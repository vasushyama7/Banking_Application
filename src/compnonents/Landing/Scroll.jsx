import React from 'react';
import AmazonLogo from '../Images/Amazonlogo.png';
import Paytm from '../Images/Paytm_logo.png';
import Microsoft from '../Images/Microsoft.webp';
import Salesforce from '../Images/Salesforce.png';
import Techwave from '../Images/Techwave.png';
import Vts from '../Images/VTS.png'
import './Scroll.css';

export default function Scroll() {
  return (
    <div className="image-container">
      <img src={Vts} alt="vts" />
      <img src={AmazonLogo} alt="Amazon Logo" />
      <img src={Paytm} alt="Paytm Logo" />
      <img src={Microsoft} alt="Microsoft Logo" />
      <img src={Salesforce} alt="Salesforce Logo" />
      <img src={Techwave} alt="Techwave Logo" />
    </div>
  );
}
