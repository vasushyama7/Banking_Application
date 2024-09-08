import React from 'react'
import NavBar from '../NavBar'
import Hero from './Hero'
import About from './About'
import './Lending.css'
import Services from './Services'
import Footer from './Footer'
import AtmCards from './AtmCards'
import Scroll from './Scroll'
import AccountTyps from './AccountTyps'
import Billpays from './BillPay'


export default function LandingPage() {
  return (
    <div className='main-page'>
      <NavBar/>
      {/* <button className='signin-btn-home'>SignIn to your Account</button> */}
      <Hero/>
      <div className='Services'> 
      <Services/>
      </div>
      <div className='about-all'>
      <div className='About'>
      <About/>
      </div>
      </div>
     
   
      <div className='AccountTyps'>
      <AccountTyps/>
      </div>
     
      <div className='Atmcards'>
         <AtmCards/>
         <Scroll/>
      </div>
      <Billpays/>
      <div className='Footer'>
        <Footer/>
      </div>
      
      
      
      
    </div>
    
  )
}
