import React from 'react'
import {Routes, Route, useNavigate,Navigate} from 'react-router-dom';
import { Button, Form, Input, Select, Space, } from 'antd';
import'./Rechargehome.css';
import Recharge from './Recharge';
const { Option } = Select;

function Rechargehome() {
    const navigate = useNavigate();
    const navigateHome = () => {
        
        navigate('/Recharge');
      };
  return (
    
    <div className="RechargeHome-container">
        <div className="header">
        <h1>Zigma Recharge</h1>
      </div>
       
    <Form layout="vertical">
      <Form.Item className='label' label="Enter 10digit Mobile Number">
        <Input placeholder='000000000' required />
      </Form.Item>
      <Form.Item name="operator" label="Select Operator" rules={[{ required: true }]}>
        <Select
          placeholder="Select operator"
        
        
     >
          <Option value="Zigma">Zigma</Option>
          <Option value="Airtel">Airtel</Option>
          <Option value="Jio">Jio</Option>
        </Select>
      </Form.Item>
      <Form.Item name="Circle" label="Select Circle" >
        <Select
          placeholder="Select Circle"
        
        
        >
          <Option value="Andhra Pradesh">Andhra Pradesh</Option>
          <Option value="Telangana">Telangana</Option>
          <Option value="TamilNadu">TamilNadu</Option>
          <Option value="Karnataka">Karnataka</Option>
          <Option value="Mumbai">Mumbai</Option>
          <Option value="Westbengal">Westbengal</Option>
        </Select>
      </Form.Item>
     <div class="button">  <button onClick={navigateHome}>Check Plans</button></div>
     
    </Form>
    </div>
  )
}

export default Rechargehome;