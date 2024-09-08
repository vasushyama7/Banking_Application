import React from 'react'
import BillImg from '../Images/BillPay.png'
import './BillPay.css'

export default function BillPay() {
  return (
    <div className='bill-ctn'>
        <h1>Bill Pay With Zigma</h1>
        <h3>Safe and secure friend to transfer your money</h3>
        <img src={BillImg} alt="" />

    </div>
  )
}
