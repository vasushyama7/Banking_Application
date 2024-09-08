import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import UserDashboard from './UserDashboard/UserDashboard'
import Fundtransfer from './Fundtransfer/Fundtransfer'


const Layout = () => {
  return (
    <div className='layout-main'>
      <div className="left">
        <Sidebar/>
      </div>
      <div className="right">
        <div className="header">
          <Header/>
        </div>
        <div style={{scrollBehavior:"smooth"}} className="right-comps">
            <section style={{backgroundColor:"red",height:"100vh"}} className='sect' id="s1">
                <UserDashboard/>
            </section>
            <section style={{backgroundColor:"orange",height:"100vh"}}className='sect' id="s2">
                <Fundtransfer/>
            </section>
            <section style={{backgroundColor:"green",height:"100vh"}}className='sect' id="s3">
                <UserDashboard/>
            </section>
        </div>
      </div>
    </div>
  )
}

export default Layout