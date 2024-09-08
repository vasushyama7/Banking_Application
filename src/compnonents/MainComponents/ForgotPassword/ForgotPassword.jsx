import React, { useState } from 'react';
import './ForgotPassword.css';
import { message } from 'antd';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://zigma-backend-fp8b.onrender.com/users/sendresetpasswordmail/${email}`);

      if (response) {
        message.success('Instructions to reset your password have been sent to your email.');
        setMessageText('Instructions to reset your password have been sent to your email.');
        navigate("/login")
      } else {
        message.error('Failed to send email. Please try again later.');
        setMessageText('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred. Please try again later.');
      setMessageText('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='main'>
      <div className="forgot-password-container">
        <div className="illustration-section">
          <img src="https://res.cloudinary.com/dsbuzlxpw/image/upload/v1719228586/otj7izokpdsdcnkbt21x.avif" alt="Forgot Password Illustration" className="illustration-image" />
        </div>
        <div className="form-section">
          <h2>Forgot Your Password?</h2>
          <p>Enter your email address and we will send you instructions to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address"
                className="email-input"
              />
            </div>
            <button type="submit" className="reset-button">Reset Password</button>
          </form>
          <a href="/login" className="back-to-login">Back to signin</a>
          {messageText && <p className="message">{messageText}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
