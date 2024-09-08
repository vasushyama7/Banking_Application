import React, { useState } from "react";
import "./payroll.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faKey,
  faFileUpload,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payroll = () => {
  const notify = () => {
    toast.success("File upload Successful!", {
      position: "top-center",
      autoClose: 1200,
    });
  };
  const successRelease = () => {
    toast.success("Fund Release Successful!", {
      position: "top-center",
      autoClose: 1200,
    });
  };
  const [invalidMpin, setInvalidPin] = useState();
  const [organisationAccountNo, setOrganisationAccountNo] = useState("");
  const [mpin, setMpin] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState();
  const [file, setFile] = useState(null);
  const [slideLeft, setSlideLeft] = useState(false);
  const [errormsg, setErrormsg] = useState();
  const [invalidotp, setInvalidOtp] = useState();
  const navigate = useNavigate()
  const handleAccNoChange = (e) => {
    setErrormsg();
    setOrganisationAccountNo(e.target.value);
  };
  const handleMpinChange = (e) => {
    setMpin(e.target.value);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet);

      const totalSalary = rows.reduce((acc, row) => acc + (row.NetPay || 0), 0);
      setTotalAmount(totalSalary);
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "https://zigma-backend-fp8b.onrender.com/org/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) notify();
    };
    reader.readAsArrayBuffer(file);
  };

  const handleContinue = () => {
    if (!organisationAccountNo) {
      setErrormsg("No Input found");
      return;
    }
    if (organisationAccountNo === "ZBKINORG000333")
      if (mpin === "7890") {
        const url = `https://zigma-backend-fp8b.onrender.com/org/sendOrgOtp/${totalAmount}`;
        axios
          .get(url)
          .then((res) => {
            setReceivedOtp(res.data.otp);
            setSlideLeft(true);
          })
          .catch((err) => console.log(err));
      } else setInvalidPin("Invlalid PIN Number");
    else setErrormsg("Invalid Account Number");
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setSlideLeft(false);
  };

  const handleOtpChange = (e) => {
    setInvalidOtp()
    setOtp(e.target.value);
  };
  const handleReleaseFunds = () => {
    try {
      if (otp === receivedOtp) {
        axios
          .post("https://zigma-backend-fp8b.onrender.com/org/sendSalary")
          .then((response) => {
            successRelease()
            console.log("Funds released successfully:", response.data);
            setSlideLeft(false);
            navigate("/dashboard")

          })
          .catch((error) => {
            console.error("Error releasing funds:", error);
          });
      }
      else{
        setInvalidOtp("Invalid OTP")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Payroll-container">
      <ToastContainer />
      <hr className="horizontal-line" />
      <div className={`payroll-form-wrapper ${slideLeft ? "slide-left" : ""}`}>
        <div className="payroll-form">
          <h2>Payroll</h2>
          <div className="form-item">
            <label className="label" htmlFor="organisationAccountNo">
              <FontAwesomeIcon icon={faBuilding} /> Organisation Account No
            </label>
            <input
              type="text"
              id="organisationAccountNo"
              value={organisationAccountNo}
              onChange={handleAccNoChange}
            />
          </div>
          {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
          <div className="form-item">
            <label className="label" htmlFor="mpin">
              <FontAwesomeIcon icon={faKey} /> MPIN
            </label>
            <input
              type="password"
              id="mpin"
              value={mpin}
              onChange={handleMpinChange}
            />
          </div>
          {invalidMpin && <p style={{ color: "red" }}>{invalidMpin}</p>}
          <div className="form-item">
            <label className="label" htmlFor="fileUpload">
              <FontAwesomeIcon icon={faFileUpload} /> Upload Excel Sheet
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </div>
          <button
            className="continue-payroll-btn"
            type="button"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
        <div className="details-card">
          <h3>Details</h3>
          <p>** OTP has been sent to your registered mail</p>
          <p style={{ fontSize: "18px" }}>
            Organisation Name: <strong>VTS Company</strong>
          </p>
          <p style={{ fontSize: "18px" }}>
            Total Amount:
            <i
              style={{ margin: "0px 5px" }}
              className="fa-solid fa-indian-rupee-sign"
            ></i>
            <span style={{ fontSize: "32px", fontWeight: "bold" }}>
              <CountUp start={0} end={totalAmount} duration={3} separator="," />
            </span>
          </p>
          <div className="form-item">
            <label className="label" htmlFor="otp">
              <FontAwesomeIcon icon={faCheckCircle} /> OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
            />
            {invalidotp && <p style={{ color: "red" }}>{invalidotp}</p>}
          </div>
          <div className="confirm-btns">
            <button
              className="continue-payroll-btn"
              type="button"
              onClick={handleReleaseFunds}
            >
              Release Funds
            </button>
            <button
              className="continue-payroll-btn"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;

// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [transactions, setTransactions] = useState([]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('https://zigma-backend-fp8b.onrender.com/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const jsonData = response.data;

//       // Initialize transactions state
//       const initialTransactions = jsonData.map(item => ({
//         accountid: item.accountid,
//         amount: item.amount,
//         status: 'Pending',
//       }));
//       setTransactions(initialTransactions);

//       // Iterate over the JSON data and perform transactions
//       for (let i = 0; i < jsonData.length; i++) {
//         const { accountid, amount } = jsonData[i];
//         try {
//           const transactionResponse = await axios.post('https://zigma-backend-fp8b.onrender.com/perform-transaction', { accountid, amount });
//           updateTransactionStatus(i, 'Success');
//         } catch (error) {
//           updateTransactionStatus(i, 'Failed');
//         }
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const updateTransactionStatus = (index, status) => {
//     setTransactions(prevTransactions => {
//       const updatedTransactions = [...prevTransactions];
//       updatedTransactions[index].status = status;
//       return updatedTransactions;
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       <table>
//         <thead>
//           <tr>
//             <th>Account ID</th>
//             <th>Amount</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction, index) => (
//             <tr key={index}>
//               <td>{transaction.accountid}</td>
//               <td>{transaction.amount}</td>
//               <td>{transaction.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FileUpload;
