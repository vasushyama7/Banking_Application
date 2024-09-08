import React, { useState } from "react";
import "./Recharge.css";
import { Button, Modal } from 'antd';
const Tab = ({ item, key }) => {
  const getData = () => {
    console.log("the key val is ", item);
  };
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data,setdata] = useState({})
  const showLoading = () => {
    console.log(item)
    setdata(item)
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    },1000);
  };
  return (
    <div>
      {/* { <Button type="primary" >
        Open Modal
      </Button> } */}
      <Modal
        title={<p>PLAN</p>}
        footer={
          <Button type="primary" >
            PAY
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div>{data.name}</div>
        <div>{data.amount}</div>
        <div>{data.perks}</div>
        <div>{data.validity}</div>
        

      </Modal>

      <div className="card" onClick={showLoading} >
        {item.badge && <div className="badge">{item.badge}</div>}
        <div className="card-header">
          <div className="amount">₹{item.amount}</div>
          <div className="data">Data: {item.perks[0]}</div>
          <div className="validity">Validity: {item.validity}</div>
        </div>

        {item.perks.length > 1 && <p>Voice: {item.perks[1]}</p>}
        {item.perks.length > 2 && <p>SMS: {item.perks[2]}</p>}
      </div>
    </div>
  );
};


function Recharge() {
  const plans = [
    {
      name: "Basic Plan",
      amount: 19,
      perks: ["1.5GB","For users with an active validity plan"],
      validity: "Base Plan",
      badge: "",
    },
    {
      name: "Standard Plan",
      amount: 500,
      perks: ["2GB/Day", "Unlimited Calls", "100 SMS/day"," True 5G data","JiO TV(Your Daily Dose of entertainment","JioCloud(Backup your files and contacts on the app)"],
      validity: "28 Days",
      badge: "Favourite",
    },
    {
      name: "Premium Plan",
      amount: 809,
      perks: ["2GB/Day + 20GB", "Unlimited Calls", "100 SMS/day"],
      validity: "90 Days",
      badge: "",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Popular");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.validity.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleclick = (index) => {
    console.log("the index", index);
  };

  return (
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
  );
}

export default Recharge;