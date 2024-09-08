import Upload from "../Uploads/Uploads";
import "./Tabsection.css";
import EmailVerification from "../EmailVerification/EmailVerification";
import React, { useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import PersonalDetails from "../AgentRegistration/AgentRegistration";
import { useNavigate } from "react-router-dom";

const Tabss = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const [completedTabs, setCompletedTabs] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const [values, setValues] = useState();
  const [uploads, setUploads] = useState();
  const navigator = useNavigate()

  

  const handleSetValues = (values) => {
    console.log("valies received for values",values)
    setValues(values);
  };
  const handleSetUploads = (vals) => {
    console.log("valies received for uploads",vals)
    setUploads(vals);
  };
  const handleCompleteSubmission = () => {
    const data = {
      FirstName: values.FirstName,
      MiddleName: values.MiddleName,
      LastName: values.LastName,
      Telephone: values.Telephone,
      MobileNumber: values.MobileNumber,
      Email: values.Email,
      State: values.State,
      City: values.City,
      Branch: values.Branch,
      Pincode: values.Pincode,
      Country: values.Country,
      Aadhar: uploads.Aadhar,
      Pan: uploads.Pan,
    };
    console.log("Data is almost ready to post ")
    console.log(data);
    const url = `https://zigma-backend-fp8b.onrender.com/users/register`
    axios.post(url,data)
    .then(res=>{
      navigator("/registrationsuccess")
    })
    .catch(err=>alert("error registering"))
  };

  const handletab = (key) => {
    setActiveKey(key);
  };

  const labelArray = [
    "Personal Information",
    "Upload Documents",
    "Email Verification",
  ];
  const tabArray = [
    <PersonalDetails
      onComplete={(key) => handletab(key)}
      onSubmission={(vals) => handleSetValues(vals)}
    />, 
    <Upload
      onComplete={(key) => handletab(key)}
      onSubmission={(vals) => handleSetUploads(vals)}
    />,
    <EmailVerification onComplete={(key) => handletab(key)} onSubmission={handleCompleteSubmission} />,
  ];

  const handleTabs = (key) => {
    setActiveKey(key);
    console.log("key clicked is ", key);
  };

  return (
    <div className="tabsection">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={handleTabs}
        tabPosition={tabPosition}
        items={tabArray.map((item, i) => {
          const id = String(i + 1);
          return {
            label: (
              <span>
                {labelArray[i]}{" "}
                {completedTabs.includes(id) && (
                  <span className="completed-tab">✅</span>
                )}
              </span>
            ),
            key: id,
            children: item,
          };
        })}
      />
      <div className="redirect-to-login">
        <a href="/login">&larr; Back to Login</a>
      </div>
    </div>
  );
};

export default Tabss;
