import React, { useState } from "react";
import "./Fundtransfer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Fundtransfer = () => {
  const [step, setStep] = useState(1);
  const [accountuser, setAccountUer] = useState(JSON.parse(localStorage.getItem("accountholder")));
  const [amount, setAmount] = useState();
  const [accountID, setAccountID] = useState();
  const [otpreceived, setOtpreceived] = useState();
  const [otp, setOtp] = useState();
  const [errormsg, setErrormsg] = useState();
  const [senderError,setSenderError] = useState()
  const user = JSON.parse(localStorage.getItem("accountholder"));
  const navigate = useNavigate()
  const handleCancel = () => {
    setStep(1);
  };
  const handleConfirmPay =() => {
    if (otp === String(otpreceived)) {
      alert("otp verified")
      const url = "https://zigma-backend-fp8b.onrender.com/users/transaction";
      const trdata = {
        "SenderAccountId" : accountuser.Account_id,
        "ReceiverAccountId" : accountID,
        "Amount" : amount
      }
      axios.post(url, trdata)
      .then(res=>{ 
        notify()
        navigate("/dashboard")
      })
      .catch(err=>alert("transaction failed"))
      setErrormsg();
    } else {
      setErrormsg("Invalid OTP");
    }
    
  };
  const notify = () => {
    toast.success("Payment Successful!", {
      position: "top-center",
      autoClose: 1200,
    });
  };
  const handleAccountNumber = (e) => {
    setSenderError()
    console.log(accountID)
    setAccountID(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  
  const getUserName = async ()=>{
    console.log("user id is " ,accountID)
    const userurl = `https://zigma-backend-fp8b.onrender.com/admin/useraccount/${accountID}`;
  // await axios.get(userurl)
  //   .then(user=>setAccountUer(user.data))
  //   .catch(err=>{setSenderError("No User Found with that Account Number")})
  const acuser = await axios.get(userurl)
  console.log("account user came"+ acuser.FirstName)
  }
  const sendOtpToSender = async ()=>{
    const email = accountuser.Email;
    // const email = user.Email;
    const username = accountuser.FirstName;
    const url = `https://zigma-backend-fp8b.onrender.com/sendpaymentotp/${email}/${username}/${amount}`
    axios.get(url)
    .then(res=>{
      setOtpreceived(res.data.otp)
    })
  }
  const handleContinue = async (e) => {
    e.preventDefault();
    await sendOtpToSender()
    
    setStep(2);
  };
  const handleOtpChange = (e) => {
    setErrormsg();
    setOtp(e.target.value);
  };

  return (
    <div className="Funds-container">
      <ToastContainer />
      <hr className="horizontal-line" />
      <div className={`funds-form-wrapper ${step === 2 ? "slide-left" : ""}`}>
        <form className="funds-form" onSubmit={handleContinue}>
          <div className="form-item">
            <label
              className="label"
              
              htmlFor="accountNumber"
            >
              Account Number
            </label>
            <input
              type="text"
              onChange={e=>setAccountID(e.target.value)}
              id="accountNumber"
              placeholder="Enter Recipient Account Number"
              required
            />
          </div>
          <div className="form-item">
            <label className="label" htmlFor="amount">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              placeholder="Enter Amount"
              onChange={handleAmount}
              required
            />
          </div>
          {senderError && (<p>{senderError}</p>)}
          <div className="form-item">
            <button type="submit">Continue</button>
          </div>
        </form>
        {step === 2 && (
          <div className="details-card">
            <h3>Confirm Transaction Details</h3>
            <p>** OTP has been sent to your registered mail</p>
            
            <div className="form-item">
              <label className="label" htmlFor="Amount">
                Amount
              </label>
              <input type="text" id="accountHolder" value={amount} disabled />
            </div>
            <div className="form-item">
              <label className="label" htmlFor="otp">
                Enter OTP
              </label>
              <input type="text" id="otp" onChange={handleOtpChange} placeholder="Enter OTP" required />
            </div>

            {errormsg && (<p>{errormsg}</p>)}
            <div className="form-item confirm-btns">
              <button type="button" onClick={handleConfirmPay}>
                Confirm
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fundtransfer;
