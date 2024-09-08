import React, { useState } from 'react';
import './ResetPassword.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, message } from 'antd';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';

const ResetPassword = () => {
  const { email } = useParams(); // Retrieve the email parameter from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match.');
      return;
    }

    try {
      await axios.put(`https://zigma-backend-fp8b.onrender.com/users/resetpassword/${email}`, {
        newPassword,
      });
      message.success('Password reset successfully.');
      navigate("/login")
      // Redirect user to login or another appropriate page after successful password reset
    } catch (error) {
      console.error('Error resetting password:', error);
      message.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="resetpassword">
      <div className="password-reset-container">
        <div className="illustration">
          <img
            src="https://res.cloudinary.com/dsbuzlxpw/image/upload/v1719228808/gdl9frdysaavzwpd4s21.png"
            alt="Key Carriers"
            className="illustration-img"
          />
        </div>
        <div className="form-section">
          <h2>Reset Your Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Input.Password
                style={{ width: '70%', height: '10%' }}
                type={passwordVisible ? 'text' : 'password'}
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter New Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div className="input-group">
              <Input.Password
                style={{ width: '70%' }}
                type={passwordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Confirm New Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <button type="submit" className="reset-button">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
