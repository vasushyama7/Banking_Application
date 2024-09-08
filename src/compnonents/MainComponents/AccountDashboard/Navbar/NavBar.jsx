import React from 'react'
import Logo from '../Assets/Photos/Logo.png'
import './NavBar.css'

export default function NavBar() {
  return (
    <div className='Navbar'>
        <div className='logo'>
            <img src={Logo} alt="" />

        </div>
        <div className='nav-itms'>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
        </div>
    </div>
  )
}