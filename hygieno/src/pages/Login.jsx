import React,{useState,useEffect} from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

import '../styles/login.css'

export var setLogin = false;

function Login() {


  let navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  const [hide , sethide] = useState(true);
  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    usertype:''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5656/login', {
        method: 'POST',
        body: JSON.stringify(formData), 
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Success man:', data.status);
        if( data[0].status === 200 )
        {
          setLogin = true;
          sessionStorage.setItem('isLogin','true');
          if (data[0].usertype === 'Disposer') {
            sessionStorage.setItem('isLoginD','true');
            navigate('/pages/disposerHome' , {state : data[1]});
          } 
          else {
            sessionStorage.setItem('isLoginC','true');
            navigate('/pages/collectorHome', {state : data[1]});
          }
        }
        else{
          
        }
        alert(data[0].message);
    } 
    else {
      console.error('Error:', response.status, response.statusText);
    }    
};

const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

  return (
    <div className='body'>
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
      

      <div className="tray">
        <div className="container-login">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit} method="post" className="input-container">
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password"  required />
            <div className="usertype">
              <div>What are you?</div>
              <input type="radio" name="usertype" id="option1" value="Disposer" onChange={handleChange} required /><label htmlFor="option1">Disposer</label>
              <input type="radio" name="usertype" id="option2" value="Collector" onChange={handleChange} required /><label htmlFor="option2">Collector</label>
            </div>
            <input type="submit" value="Log In" />
            <div style={{ fontSize: '15px', fontStyle: 'italic' }}>Don't have an account? <a href="/signup" className="url">Create one</a></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
