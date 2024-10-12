import React from 'react';
import '../styles/about.css'
import ram from '../assets/ram.jpeg'
import aju from '../assets/aju.jpeg'
import noyal from '../assets/noyal.jpeg'
import philips from '../assets/philips.jpeg'
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-page">
       <header className='headerHome'>
            <nav>
                <div class="containerHomeNav">
                    <h1>HYGIENO</h1>
                    <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                            <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
      <div className="about-section">
        <h1 id="abbt">About Us</h1>
        <p><h3>We are a team of four, proudly presenting you hygieno. It was one of the greatest projects mainly aiming at Empowering communities through effective waste managemnet practices...
        </h3></p>
      </div>
      <h2 style={{ textAlign: 'center' }}>Let's meet the petals of our team</h2>
      <div className="container">
        <div className="column">
          <div className="card">
            <img src={ram} alt="Jane" style={{ width: '100%' }} />
            <div className="container1">
              <h2> ꜱᴀɴᴊᴀʏʀᴀᴍᴘʀᴀꜱᴀᴅ ᴠ ꜱ</h2>
              <p className="title"> Front-end dev</p>
              <p> <h8> CSE</h8></p>
              <h8> sanjayramprasad1234@gmail.com</h8>
              <p><h8> 89436 93607</h8></p>
            </div>
          </div>
        </div>
      
        <div className="column">
          <div className="card">
            <img src={noyal} alt="Jane" style={{ width: '100%' }} />
            <div className="container1">
              <h2> ɴᴏʏᴀʟ ʀᴇᴊɪ</h2>
              <p className="title"> Back-end dev</p>
              <p> <h8> CSE</h8></p>
              <h8> noyalreji10@gmail.com</h8>
              <p><h8> 81299 70103</h8></p>
            </div>
          </div>
        </div>
        
        <div className="column">
          <div className="card">
            <img src={aju} alt="Jane" style={{ width: '100%' }} />
            <div className="container1">
              <h2> ᴀᴊᴜ ᴊᴏꜱᴇᴘʜ</h2>
              <p className="title"> Back-end dev</p>
              <p> <h8> CSE</h8></p>
              <h8> ajujoseph52@gmail.com</h8>
              <p><h8> 85906 63549</h8></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={philips} alt="Jane" style={{ width: '100%' }} />
            <div className="container1">
              <h2> ᴘʜɪʟɪᴘꜱ ᴊᴏꜱᴇ</h2>
              <p className="title"> Front-end dev</p>
              <p> <h8> CSE</h8></p>
              <h8> philips20@gmail.com</h8>
              <p><h8> 97784 41290</h8></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
