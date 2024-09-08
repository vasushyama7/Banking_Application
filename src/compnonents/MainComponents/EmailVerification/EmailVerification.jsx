import React, { useState, useEffect } from 'react';
import './EmailVerification.css';
import {  Input, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const EmailVerification = ({onSubmission,onComplete}) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [msg,setMsg] =useState()
  const [showOtpInput, setShowOtpInput] = useState(false);
const [otpValue,setOtpValue] = useState()
const [receivedOtp,setReceivedOtp] = useState()
    const notify = () => {
      toast.success('OTP sent successfully!', {
        position: 'top-center',
        autoClose: 1500,
      });
    };
    const otpfail = () => {
      toast.error('Error!', {
        position: 'top-center',
        autoClose: 1500,
      });
    };
    const otpSuccess = ()=>{
      toast.success("OTP verified",{
        position:'top-center',
        autoClose:1500,
      })
    }
  const onChange = (text) => {
    console.log('onChange:', text);
    setOtpValue(text)
  };
  const sharedProps = {
    onChange,
  };



  useEffect(() => {
    let timer;
    if (isOtpSent && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerComplete(true);
      setIsOtpSent(false)
    }

    return () => clearTimeout(timer);
  }, [isOtpSent, timeLeft]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    const url = `https://zigma-backend-fp8b.onrender.com/sendregisterotp/${localStorage.getItem("email")}/${localStorage.getItem("username")}`
    axios.get(url)
    .then(res=>{
      setReceivedOtp(res.data.otp)
    })
    notify()
    setMsg("An OTP has been sent to your given email. Please enter it to verify.")
    setIsOtpSent(true);
    setIsTimerComplete(false);
    setTimeLeft(90);
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    onComplete('1')
    setIsOtpSent(false);
    setTimeLeft(90);
  };
  const handleVerify = (e)=>{
    e.preventDefault();
    if(otpValue === String(receivedOtp)){
      otpSuccess()
      onSubmission()
    }
    else
      otpfail()
  }

  return (
    <div className='email-verification'>
      <ToastContainer />
      <div className="email-verification-container">
        <div className="illustration-section">
          <img src="https://res.cloudinary.com/dsbuzlxpw/image/upload/v1719228494/li050afkupfgja4cyhus.jpg" alt="Forgot Password Illustration" className="illustration-image" />
        </div>
        <div className="form-section">
          <h2>Email Verification</h2>
          <form >
            <Input value={localStorage.getItem("email")} disabled/>
            {isOtpSent && (
                <div className="input-group">
                <Input.OTP  {...sharedProps} />
                {msg && (<p className='message'>{msg}</p>)}
                </div>
            )}
            {isOtpSent && !isTimerComplete && (
            <div className="timer-section">
              <p style={{textAlign:"start"}}>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</p>
            </div>
          )}
          
          {isOtpSent ? (<><button onClick={handleVerify} className="reset-button">Verify</button></>):(<><button onClick={handleSendOtp} className="reset-button">Send Otp</button></>)}
          
        
            
            {isOtpSent && (
                <div>
                <p className='links'><a href="/" onClick={handleSendOtp}>Resend OTP</a></p>
                <p className='links'><a  className="change-email-button" onClick={handleResendOtp}>Change Email Address</a></p>
                
                  
                </div>
            )}
            


          </form>
          
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
