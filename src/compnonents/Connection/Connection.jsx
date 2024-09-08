import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserDashboard from '../UserDashboard/UserDashboard'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import RechargeHome from '../BillPay/RechargeHome'
const Connection = () => {
  return (
    <div>
      {/* <Tabs /> */}
      <BrowserRouter>
        <div className="dashboard-container">
      <Sidebar />
      <div className="content">
            <Header />     
        <Routes>
              <Route path='/' element={<UserDashboard />} />
              <Route path='/fund-transfer' element={<RechargeHome />} />
              <Route path='/rech' element={<RechargeHome />}/>
        </Routes>
      </div>
    </div>
      </BrowserRouter>
    </div>
  )
}

export default Connection
