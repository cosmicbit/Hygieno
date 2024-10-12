import React ,{useEffect, useState}from 'react'
import Profile from '../components/Profile';
import WasteCard from '../components/WasteCard';
import ServiceSlider from '../components/ServiceSlider';
import ListWaste from '../components/ListWaste';
import { FaTrashCanArrowUp } from "react-icons/fa6" 
import { FaSearch } from "react-icons/fa";
import FindUser from '../components/FindUser';
import { setLogin } from './Login';
import { useNavigate , useLocation } from 'react-router-dom';

export const wasteData = React.createContext();
export let reportLocationDisposer;
export let reportStatusChange;
function DisposerHome() {

  let navigate = useNavigate();
  
  let { state } = useLocation();

  const [wasteDetails,setwasteDetails ] = useState([]);

  reportLocationDisposer = ( data ) => {
    state.location = data;
  }

  reportStatusChange = ( data ) => {
    console.log("herte");
    console.log(data);
    setwasteDetails(data);
  }

  useEffect( () => {
    if( sessionStorage.getItem('isLoginD') === 'false')
      navigate('/login');
  },[])

  useEffect( () => {
    //implement passing session id to fetch waste orders to have increased security later
    async function fetchWastes() {
      const res = await fetch(`http://localhost:5656/getWasteRequest?id=${state._id}`, {
      method: 'GET'
      });
      const response = res.json();
      response.then( (data) => {
      setwasteDetails(data.wasteData);
    }).catch( err =>   console.log(err))
  }
  fetchWastes();
  },[])
  
  const sliderData = ["Dispose"];
  const [isOn,setisOn] = useState(false);
  const [changeSlider,setChangeSlider] = useState(0);
  const icons= [FaTrashCanArrowUp,FaSearch];
  
  const setShowItemBox = (value) => {
    setisOn(value);
  }

  const changeServicePage = (activeSlider) => {
    setChangeSlider(activeSlider)
  }

  function reportLogout() {
    sessionStorage.setItem('isLoginD','false');
    navigate('/login');
  }

  return (
    
    <div className='main'>
        <wasteData.Provider value={{wasteDetails,state}}>
            <Profile state={state} userType={'disposer'} reportLogout={reportLogout}></Profile>     
            <WasteCard /> 
            <ServiceSlider sliderData={sliderData} changeServicePage={changeServicePage} icons={icons}></ServiceSlider>
            {
              changeSlider === 0 ?
                  <ListWaste setShowItemBox={setShowItemBox} isOn={isOn}></ListWaste>
              : changeSlider === 1 ? <FindUser></FindUser> : ''
            }       
        </wasteData.Provider>
    </div>
  )
}
export default DisposerHome
