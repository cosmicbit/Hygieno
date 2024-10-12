import React ,{useEffect, useState}from 'react'
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';
import AddItemsC from '../components/AddItemsC';
import ServiceSlider from '../components/ServiceSlider';
import ViewCollectionAreas from '../components/ViewCollectionAreas';
import FindUser from '../components/FindUser';
import { FaTrashCanArrowUp } from "react-icons/fa6" 
import { FaPlus } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { useNavigate , useLocation } from 'react-router-dom';
import '../styles/dashboard.css'
import NewRqFromD from '../components/NewRqFromD';

export const collectionAreaData = React.createContext();

const sliderData = ["Add New Collection Area","View Collection Areas","View Requests from Disposers"];

function CollectorHome() {

  const { state } = useLocation();
  console.log(state);
  let navigate = useNavigate();

  const [collectionAreaDetails,setCollectionAreaDetails ] = useState([]);

  const [changeSlider,setChangeSlider] = useState(0);
  
  const icons= [FaPlus,FaSearch,FaSearch];

  
  const changeServicePage = (activeSlider) => {
    setChangeSlider(activeSlider)
  }


  useEffect( () => {
    if(sessionStorage.getItem('isLoginC') === 'false')
      navigate('/login');
  },[])

  function reportLogout() {
    sessionStorage.setItem('isLoginC','false');
    navigate('/login');
  }

  return (
    <div className="collectorhome">
      <Sidebar state={state} userType={'collector'}></Sidebar>
      <div className='main-content'>
        <Profile state={state} userType={'collector'}  reportLogout={reportLogout} ></Profile>
        <ServiceSlider sliderData={sliderData} changeServicePage={changeServicePage} icons={icons}></ServiceSlider>
        {
          changeSlider === 0 ? 
          <collectionAreaData.Provider value={{collectionAreaDetails,state}}>
              <AddItemsC ></AddItemsC>
          </collectionAreaData.Provider>
          : changeSlider === 1 ? <ViewCollectionAreas state={state}></ViewCollectionAreas> 
          : changeSlider === 2 ? <NewRqFromD state={state}/> :null
        }     
      </div>
            
    </div>
  )
}

export default CollectorHome;