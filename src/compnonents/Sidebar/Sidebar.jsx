
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt, faFileInvoiceDollar, faExchangeAlt, faUser, faBell, faCreditCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setActivePath(path);
  };
  const handleLogout = ()=>{
    localStorage.setItem("loading","true")
    navigate("/")
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">Zigma</div>
      <div className={`sidebar-item ${activePath === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('/dashboard')}>
        <FontAwesomeIcon icon={faMoneyCheckAlt} /> <span>Dashboard</span>
      </div>
      <div className={`sidebar-item ${activePath === '/fundtransfer' ? 'active' : ''}`} onClick={() => handleNavigation('/fundtransfer')}>
        <FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Fund Transfer</span>
      </div>
      <div className={`sidebar-item ${activePath === '/transactions' ? 'active' : ''}`} onClick={() => handleNavigation('/transactions')}>
        <FontAwesomeIcon icon={faExchangeAlt} /> <span>Transactions</span>
      </div>
      <div className={`sidebar-item ${activePath === '/billpay' ? 'active' : ''}`} onClick={() => handleNavigation('/billpay')}>
        <FontAwesomeIcon icon={faUser} /> <span>Bill Pay</span>
      </div>
      <div className={`sidebar-item ${activePath === '/payroll' ? 'active' : ''}`} onClick={() => handleNavigation('/payroll')}>
        <FontAwesomeIcon icon={faCreditCard} /> <span>Generate Payroll</span>
      </div>
      <div className={`sidebar-item ${activePath === '/logout' ? 'active' : ''}`} onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
      </div>
      <div className="sidebar-footer">
        <div className="address-header">Address</div>
        <div className="address-content">
          PTK Nagar,<br/>
          Thiruvanmiyur, Chennai,<br/>
          TamilNadu<br/>
          India
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
