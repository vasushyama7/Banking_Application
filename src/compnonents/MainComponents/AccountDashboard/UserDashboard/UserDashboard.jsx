import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt, faFileInvoiceDollar, faExchangeAlt, faUser, faBell, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
const UserDashboard = () => {
  const [AccountData,setAccountdata] = useState() 

  useEffect(()=>{
    const url = `https://zigma-backend-fp8b.onrender.com/admin/useraccount/${localStorage.getItem("Account_id")}`
    axios.get(url)
    .then(res=>{
      console.log(res.data)
      setAccountdata(res.data)
      localStorage.setItem("AccountHolderData",JSON.stringify(res.data))
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const navigate = useNavigate(); 
  
  const handleAddTransaction = () => {
    navigate('/transactions');
  };

  const handleBillPay = () => {
    navigate('/billpay');
  };

  const handleFundTransfer = () => {
    navigate('/fundtransfers');
  };
  const handleProfile=() => {
    navigate('/profile');
  }
 
  return (
    <div className="cards">     
      <div className="user-dashboard-container">   
        <h1>WELCOME TO USER DASHBOARD</h1>
        <div className="user-card-container">
          <div className="user-dashboard-card" onClick={handleAddTransaction}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} className="card-icon" />
            <h3>Transactions</h3>
          </div>
          <div className="user-dashboard-card" onClick={handleBillPay}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="card-icon" />
            <h3>Bill Pay</h3>
          </div>
          <div className="user-dashboard-card" onClick={handleFundTransfer}>
            <FontAwesomeIcon icon={faExchangeAlt} className="card-icon" />
            <h3>Fund Transfer</h3>
          </div>
          <div className="user-dashboard-card" onClick={handleProfile}>
            <FontAwesomeIcon icon={faUser} className="card-icon" />
            <h3>Profile</h3>
          </div>
          <div className="user-dashboard-card">
            <FontAwesomeIcon icon={faBell} className="card-icon" />
            <h3>Notifications</h3>
          </div>
          <div className="user-dashboard-card">
            <FontAwesomeIcon icon={faCreditCard} className="card-icon" />
            <h3>Cards</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
