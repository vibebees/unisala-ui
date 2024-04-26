import React from 'react';
import './css/animate.css';
import './css/flex-slider.css';
import './css/templatemo-scholar.css';
import './css/flex-slider.css';


export const  LandingPageTemplate: React.FC = () => {
  return (
    <div >


      {/* Header Area */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="index.html" className="logo">
                  <img src="./assets/images/unisala2.png" alt="Unisala Logo" width="100px" height="100px" style={{ borderRadius: '50%' }} />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner */}
      <div className="main-banner" id="top" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-text">
                <h2>Navigate Your U.S. University Journey with Ease</h2>
                <p>From finding the right university to settling in abroad, Unisala is your trusted companion every step of the way.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services section" id="services">
        <div className="container">
          <div className="row">
            {/* Single Service */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="icon">
                  <img src="assets/images/service-01.png" alt="online degrees" />
                </div>
                <div className="main-content">
                  <h4>Online Degrees</h4>
                  <p>Whenever you need free templates in HTML CSS, you just remember TemplateMo website.</p>
                  <div className="main-button">
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            {/* More services can be added here */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="col-lg-12">
            <p>Copyright © 2024 Unisala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

