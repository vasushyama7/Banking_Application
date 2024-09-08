import React from 'react'
import { Form, Input, Pagination,Button } from 'antd';
import'./FundTransfer.css';
export default function Fundtransfer() {
  return (
    
    <div className="Funds-container">
       
      <Form layout="vertical">
        <Form.Item className='label' label="Account Number">
          <Input placeholder='Enter Recipient Account Number' required />
        </Form.Item>
        <Form.Item className='label' label="IFSC Code">
          <Input placeholder='Enter IFSC Code' required />
        </Form.Item>
        <Form.Item className='label' label="Amount">
          <Input placeholder='Enter Amount' required />
        </Form.Item>
        
       
      
      <Form.Item><button> Continue</button></Form.Item>
      </Form>
      
    </div>
  )
}