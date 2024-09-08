import React, { useState } from "react";
import "./Login.css";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import axios from "axios";
import { Flex, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const Login = () => {
  const [accountId, setAccountId] = useState();
  const [password, setPassword] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [errormsg, setErrormsg] = useState();
  const navigator = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const url = `https://zigma-backend-fp8b.onrender.com/users/login/${accountId}/${password}`;
    axios
      .get(url)
      .then((res) => {
        localStorage.setItem("accountholder", JSON.stringify(res.data.user));
        localStorage.setItem("Account_id", accountId);
        if (res.data.message === "Login successful") {
          setErrormsg();
          navigator("/dashboard");
        } else {
          setErrormsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("err");
      });
  };
  const handleAccountid = (e) => {
    setAccountId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  <Button
    style={{
      width: 100,
    }}
    onClick={() => setPasswordVisible((prevState) => !prevState)}
  >
    {passwordVisible ? "Hide" : "Show"}
  </Button>;

  return (
    <div className="login">
      <div className="login-container">
        <div className="left-section">
          <img
            src="https://res.cloudinary.com/dsbuzlxpw/image/upload/v1719228722/l2ebt1c5pffycdcja1p6.jpg"
            alt=""
          />
        </div>
        <div className="right-section">
          <div className="login-box">
            <center>
              <h2>Welcome to Zigma Banking</h2>
            </center>
            <form>
              <div className="input-group">
                <label htmlFor="accountNumber">Account number:</label>
                <Input
                  onChange={handleAccountid}
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  required
                  placeholder="Enter account number"
                  prefix={<UserOutlined />}
                />
                <br />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <Input.Password
                  onChange={handlePassword}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                  type="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                />
              </div>

              <div className="button-group">
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="submit-button"
                >
                  Login
                </button>
              </div>
            </form>
            {errormsg && (<p style={{color:"red"}} >{errormsg}</p>)} 
            <div className="additional-links">
              <p style={{color:"black"}}>
                Do not have an Account yet?{" "}
                <a href="/register" className="forget">
                  Register Here
                </a>
              </p>
              <a href="/ForgotPassword">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
