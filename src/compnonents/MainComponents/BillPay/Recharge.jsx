import React, { useState } from "react";
import "./Recharge.css";
import { Button, Modal, Card } from 'antd';

const Tab = ({ item }) => {
  const PerksList = ({ perks }) => {
    return (
      <div >
        {perks.map((perk, index) => (
          <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            {perk.includes("JiO TV") && (
              <img
                src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1719556254/nzseo8ybxds4x2zza6t0.png"
                alt="JiO TV"
                style={{ width: '20px', marginRight: '8px' }}
              />
            )}
            {perk.includes("JioCloud") && (
              <img
                src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1719556254/nzseo8ybxds4x2zza6t0.png"
                alt="JioCloud"
                style={{ width: '20px', marginRight: '8px' }}
              />
            )}
            {perk.includes("Disney+Hotstar Mobile") && (
              <img
                src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1719556232/aamzk32rvkthumc2hhl3.jpg"
                alt="Disney+Hotstar Mobile"
                style={{ width: '20px', marginRight: '8px' }}
              />
            )}
            {perk}
          </div>
        ))}
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const showLoading = () => {
    setData(item);
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Modal
        title={<p>PLAN DETAILS</p>}
        footer={
          <Button type="primary">
            PAY
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Card className="modal-card">
          <div style={{ marginBottom: '16px' }}>
            <strong>Amount: </strong>₹{data.amount}
          </div>
          <PerksList perks={data.perks || []} />
        </Card>
      </Modal>

      <div className="card" onClick={showLoading}>
        {item.badge && <div className="badge">{item.badge}</div>}
        <div className="card-header">
          <div className="amount">₹{item.amount}</div>
          <div className="data">Data: {item.perks[0]}</div>
          <div className="data">Calls: {item.perks[1]}</div>
          <div className="data">SMS: {item.perks[2]}</div>
          <div className="validity">Validity: {item.validity}</div>
        </div>
      </div>
    </div>
  );
};

function Recharge() {
  const plans = [
    {
      name: "Basic Plan",
      amount: 19,
      perks: ["1.5GB", "Unlimited Calls", "100 SMS/day", "For users with an active validity plan", "Disney+Hotstar Mobile"],
      validity: "Base Plan",
      badge: "",
    },
    {
      name: "Standard Plan",
      amount: 500,
      perks: ["2GB/Day", "Unlimited Calls", "100 SMS/day", "JiO TV (Your Daily Dose of entertainment)", "JioCloud (Backup your files and contacts on the app)", "Disney+Hotstar Mobile"],
      validity: "28 Days",
      badge: "Favourite",
    },
    {
      name: "Premium Plan",
      amount: 809,
      perks: ["2GB/Day + 20GB", "Unlimited Calls", "100 SMS/day", "JiO TV (Your Daily Dose of entertainment)", "JioCloud (Backup your files and contacts on the app)", "Disney+Hotstar Mobile"],
      validity: "90 Days",
      badge: "",
    },
    {
      name: "Premium Plan",
      amount: 700,
      perks: ["2GB/Day + 20GB", "Unlimited Calls", "100 SMS/day", "JiO TV (Your Daily Dose of entertainment)", "JioCloud (Backup your files and contacts on the app)", "Disney+Hotstar Mobile"],
      validity: "90 Days",
      badge: "",
    },
    {
      name: "Premium Plan",
      amount: 1300,
      perks: ["2GB/Day + 20GB", "Unlimited Calls", "100 SMS/day", "JiO TV (Your Daily Dose of entertainment)", "JioCloud (Backup your files and contacts on the app)", "Disney+Hotstar Mobile"],
      validity: "1 YEAR",
      badge: "",
    },
    {
      name: "Premium Plan",
      amount: 1000,
      perks: ["3GB/Day + 20GB", "Unlimited Calls", "100 SMS/day", "JiO TV (Your Daily Dose of entertainment)", "JioCloud (Backup your files and contacts on the app)", "Disney+Hotstar Mobile"],
      validity: "4 MONTHS",
      badge: "",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.validity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mainsr">
      <div className="recharge-container">
        <div className="header">
          <h1>Select a recharge plan</h1>
        </div>
        <input
          type="text"
          placeholder="Search for a plan, eg 249 or 28days "
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <div className="card-container">
          {filteredPlans.map((plan, index) => (
            <Tab item={plan} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recharge;
