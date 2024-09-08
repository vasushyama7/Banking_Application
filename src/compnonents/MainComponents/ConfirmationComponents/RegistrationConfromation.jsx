import React, { useEffect, useState } from 'react'
import "./styles.css"
import { useNavigate } from 'react-router-dom';
const RegistrationConfromation = () => {
  const [counter,setCounter] = useState(10)
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(() => {
      const count = counter-1
      setCounter(count)
    }, 1000);
  })
  setTimeout(() => {
    navigate("/")
  }, 10000);
  return (
    <div className='confirmation-msg'>
    <div className="registration-message">
    <p>
      Thank you for registering with our <strong>ZIGMA BANK</strong>. Your email has been verified,
      and your registration is currently being processed.<br/> <br/>Once our team
      verifies your documents, you will receive your login credentials at the
      email address you provided. We appreciate you choosing our services and
      look forward to serving you.<br/><br/>
      Team <strong>ZIGMA BANK</strong> Customer Support
    </p>
    
  </div>
  <h4>You will be Redirected to the Home Page after <strong style={{fontSize:"18px",marginLeft:"5px"}}>{ counter}</strong> s</h4>
  
  </div>
  )
}

export default RegistrationConfromation
