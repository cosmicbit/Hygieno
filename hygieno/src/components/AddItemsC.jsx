import React ,{useState,useEffect, useRef, useContext}from 'react'
import {collectionAreaData} from '../pages/CollectorHome'
import MapComponent from './MapComponent';
import { collectionAreaCoord } from './MapComponent';
import '../styles/addItemsC.css'

function AddItemsC() { 
  console.log("done");
 
  const [activeTab, setActiveTab] = useState('wasteType'); 
  const [selectedTypes, setSelectedTypes] = useState([]);
  const {state} = useContext(collectionAreaData);

  const resetValues = () => {
    setActiveTab('wasteType');
    setSelectedTypes([]);
    setTimeout(() => {
      resetCheckbox();
    }, 500);
  };

  const resetCheckbox = () => {
    const box = document.getElementsByClassName('box');
    const boxArray = Array.from(box);
    boxArray.map((value,index)=>{
      box[index].checked=false;
    })   
  }

  const handleCheckboxChange = async (e) => {
    const { value, checked } = e.target;
    console.log(e.target.value);
    console.log(e.target.checked);
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } 
    else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
    console.log(selectedTypes);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const validationCheck = () => {
    const boxes = document.getElementsByClassName('custom-checkbox');
    
    let shouldReturn = false;
    const boxArray = Array.from(boxes);
    console.log("boxes");
    console.log(boxArray); 
    boxArray.map((value,index)=>{
      if( boxArray[index].checked === true){
        handleTabChange('location');
        shouldReturn = true;
      }
    })
    if(shouldReturn===true)
      return;
    const errorAnimation = document.getElementById('container')
    errorAnimation.classList.add('error');
    setTimeout(() => {
      errorAnimation.classList.remove('error');
    }, 1000);
    return false;
  } 

  function prettyTime(date) {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const year = date.getFullYear(); 
    const monthIndex = date.getMonth(); 
    const month = months[monthIndex]; 
    const day = date.getDate(); 
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 
    const seconds = date.getSeconds(); 
  
    const formattedDateTime = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  const handleSubmit = async () => {
    if(collectionAreaCoord != [0,0]){
      console.log("donesubmit");
      let collectionAreaData = new FormData();
      collectionAreaData.append('userId',state._id);
      collectionAreaData.append('email',state.email);
      const time = prettyTime( new Date() );
      console.log(time);
      console.log('hero');
      collectionAreaData.append('date',time);
      collectionAreaData.append('wasteTypes',selectedTypes);
      console.log(selectedTypes);
      collectionAreaData.append('location',JSON.stringify({
        type: 'Point',
        coordinates: collectionAreaCoord
      }));
      console.log(collectionAreaCoord);
      
      console.log(collectionAreaData);
      
      await fetch('http://localhost:5656/collectionAreaRequests',{
        method:'POST',
        body:collectionAreaData
      })
      .then( response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
      })
      .then( data => console.log(data.message))
      resetValues();
    }else{
      const errorAnimation = document.getElementById('container')
      errorAnimation.classList.add('error');
      setTimeout(() => {
        errorAnimation.classList.remove('error');
      }, 1000);
      alert('You to mark your location in the map.');
    
    }
  }

  return (
    <div className='body' id='container'>
      <div className="content">
      {
        activeTab=== 'wasteType' ? 
            <div className='tab get-waste-type-tab'>
              <div>
                  <h2>Waste Type</h2>
                  <p>Select the type of waste:</p>
                  <div class='checkbox-container'>
                  <input className="custom-checkbox"  type="checkbox" id="checkbox1" value='Plastic' onChange={handleCheckboxChange} /> 
                    <label class="checkbox-label" for="checkbox1">
                      Plastic
                    </label>
                    <input className="custom-checkbox" type="checkbox" id="checkbox2" value='Metal' onChange={handleCheckboxChange}/> 
                    <label class="checkbox-label" for="checkbox2">
                      Metal
                    </label>
                    <input className="custom-checkbox" type="checkbox" id="checkbox3" value='Paper' onChange={handleCheckboxChange} />
                    <label class="checkbox-label" for="checkbox3">
                       Paper
                    </label>
                    <input className="custom-checkbox" type="checkbox" id="checkbox4" value='Paper' onChange={handleCheckboxChange} />
                    <label class="checkbox-label" for="checkbox4">
                       Hazardous
                    </label>
                    <input className="custom-checkbox" type="checkbox" id="checkbox5" value='Paper' onChange={handleCheckboxChange} />
                    <label class="checkbox-label" for="checkbox5">
                       Organic
                    </label>
                  </div>
              </div>
                
                <div className='next-btn-component'>
                    <button className="next-btn" onClick={() => validationCheck()}>Next</button>
                </div>
            </div>
          : activeTab=== 'location'?
            <div className='tab get-location-tab'>
              <div>

                <p>Please either type the address of the area 
                  you want to add as new COLLECTION AREA 
                  or mark the location in the map
                </p>
                <MapComponent ></MapComponent>
              </div>
                <div>
                    <section className='back-submit-btn-component'>
                        <button className="back-btn" onClick={() => handleTabChange('wasteType')}>Back</button>
                        <button className="submit-btn" onClick={handleSubmit}>Submit</button>          
                    </section>
                </div>
            </div>
          : ''  
      }
      </div>
    </div>
      
  );
}

export default AddItemsC;