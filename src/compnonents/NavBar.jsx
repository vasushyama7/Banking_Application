import React from 'react'
import Logo from './Images/Logo.png'
import './NavBar.css'

export default function NavBar() {
  return (
    <div className='Navbar'>
        <div className='logo'>
            <img src={Logo} alt="" />

        </div>
        <div className='landing-nav-itms'>
            <a href="/login">Sign in</a>
            <a href="/register">Sign Up</a>
        </div>
    </div>
  )
}
