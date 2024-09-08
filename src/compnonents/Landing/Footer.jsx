import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div>
      <footer id="footer">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 text-lg-left text-center">
              <div className="copyright">
                &copy; Copyright <strong>Zigma Bank</strong>. All Rights Reserved
              </div>
              <div className="credits">
                Designed by <a href="https://www.zigmabank.com">Zigma Bank</a>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="footer-links text-lg-right text-center pt-2 pt-lg-0">
                <a href="#intro" className="scrollto">Home</a>
                <a href="#about" className="scrollto">About</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-use">Terms of Use</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
