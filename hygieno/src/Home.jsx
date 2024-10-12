import {React , useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import '../src/styles/home.css'
import image from "./assets/1000_F_101682732_OejrMC8RzUdpxMVmSQLhgsnTW2HQloO0.jpg"
import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

function Home() {
    

    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const [hide , sethide] = useState(true);
    const handleResize = () => setWidth(window.innerWidth);
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

return (
    <div>
        <div className="ppc">
        <header className='headerHome'>
            <nav>
                <div className={` ${width > 568 ? 'containerHomeNav' : 'containerHomeNavMob'}`}>
                    <h1  onClick={ () => {
                        navigate("/")
                    }}>HYGIENO</h1>
                    {
                        width <= 568 ? (  
                            

                            <div className="optionC">
                                <button className='optionBtn'  onClick={()=> sethide(!hide)}>
                                     <RxHamburgerMenu className='hamburger' style={{color:'white'}} size='20'/>
                                 </button>

                           { !hide && (
                                <div className="Options">
                                        <li><Link  to="/login">Login</Link></li>
                                        <li><Link to="/signup">Sign up</Link></li>
                                </div>
                            )
                        }
                            </div>
                           

                            

                        ) : (
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>                        
                    )}
                    
                </div>
            </nav>
        </header>
        <section className="hero">
            <div className="container-home">
                <h2>Your Trusted Waste Management Partner</h2>
                <p>Providing Sustainable Waste Solutions For A Cleaner Environment</p>
                <Link className='btn' to="/signup">Get Started</Link>
            </div>
        </section>
        </div>
        

        <section className='ourAim'>
            <div className="ourAimContainer">
            <section className='aimText'>
                    <p>
                        We provide a platform that enables people to list their wastes for disposal which then will be collected responsibly
                    </p>
                </section>
                <img src={image} alt="" />
                
            </div>
        </section>

        <section className="features">
            <div className="container-home">
                <h2>Our Services</h2>
                <div className="feature-box">
                    <h3>Reduce</h3>
                    <p>ᴡɪᴛʜ ᴇᴠᴇʀʏ ᴀᴄᴛ ᴏꜰ ᴡᴀꜱᴛᴇ ʀᴇᴅᴜᴄᴛɪᴏɴ, ᴡᴇ ᴘᴀᴠᴇ ᴛʜᴇ ᴡᴀʏ ꜰᴏʀ ᴀ ᴡᴏʀʟᴅ ᴡʜᴇʀᴇ ᴄᴏɴꜱᴇʀᴠᴀᴛɪᴏɴ ᴀɴᴅ ʜᴀʀᴍᴏɴʏ ʀᴇɪɢɴ ꜱᴜᴘʀᴇᴍᴇ.</p>
                </div>
                <div className="feature-box">
                    <h3>Waste Collection</h3>
                    <p>ʀᴇʟɪᴀʙʟᴇ ᴡᴀꜱᴛᴇ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ꜱᴇʀᴠɪᴄᴇꜱ ꜰᴏʀ ʀᴇꜱɪᴅᴇɴᴛɪᴀʟ ᴀɴᴅ ᴄᴏᴍᴍᴇʀᴄɪᴀʟ ᴄʟɪᴇɴᴛꜱ.</p>
                </div>
                <div className="feature-box">
                    <h3>Hazardous Waste Disposal</h3>
                    <p>ꜱᴀꜰᴇ ᴀɴᴅ ᴄᴏᴍᴘʟɪᴀɴᴛ ᴅɪꜱᴘᴏꜱᴀʟ ᴏꜰ ʜᴀᴢᴀʀᴅᴏᴜꜱ ᴡᴀꜱᴛᴇ ᴍᴀᴛᴇʀɪᴀʟꜱ.</p>
                </div>
            </div>
        </section>

        <footer>
            <div className="container-home">
                <p>&copy; 2024 Waste Management. All rights reserved.</p>
            </div>
        </footer>
    </div>
  )
}

export default Home