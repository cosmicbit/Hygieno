import React,{useState}from 'react'
import '../styles/serviceSlider.css'
//import { FaTrashCanArrowUp } from "react-icons/fa6";
//import { FaSearch } from "react-icons/fa";

function ServiceSlider({sliderData,changeServicePage,icons}) {
  const [active,setActive]=useState({key:0})

  const toggleValue = (index) => {
    const curKey = index
    console.log(curKey);
    if( curKey === active.key)
      return;
    else
    {
      setActive({key:curKey}
    );
      changeServicePage(curKey);
  }
}
  const sliderDivs = sliderData.map((sliderName, index) => (
    <div key={index} className="slider" onClick={()=>toggleValue(index)}>
      <span> {React.createElement(icons[index])} </span>
      {sliderName}
      <div  className={`progressBar ${ index === active.key ? 'show' :''}`}></div>
    </div>
  ));

 /* const sliderDivs = sliderData.map((sliderName, index) => (
    <div key={index} className="slider" onClick={()=>toggleValue(index)}>
      <span> {index === 0 ? <FaTrashCanArrowUp/> : <FaSearch/>} </span>
      {sliderName}
      <div  className={`progressBar ${ index === active.key ? 'show' :''}`}></div>
    </div>
  ))*/

  return (
    <div className="sliderContainer">
          {sliderDivs}
    </div>    
  )
}

export default ServiceSlider