import React ,{useState,useEffect, useRef , useContext}from 'react'
import "../styles/addItems.css"
import {wasteData} from '../pages/DisposerHome'
import { dNewWaste } from './WasteCard';
function AddItems({isOn,setShowItem}) { 
  const [showItemBox, setShowItemBox] = useState(false);
  const [activeTab, setActiveTab] = useState('wasteType'); 
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const controlClickRef = useRef();
  const {state} = useContext(wasteData);


  const handleOutsideClick = (event) => {
    if (controlClickRef.current && !controlClickRef.current.contains(event.target)) {
      setShowItemBox(false); 
      setShowItem(false);
    }
  };

  useEffect(() => {
    if (showItemBox) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showItemBox]);

  useEffect(() => {
    setShowItemBox(isOn);
    if(isOn)
    {
      document.querySelector("body").classList.add("LockScroll");
    }
    else
      document.querySelector("body").classList.remove("LockScroll");

    return () => {
      document.querySelector("body").classList.remove("LockScroll");
    };
  }, [isOn]);

 

  const toggleItemBox = () => {
    setShowItemBox(false);
    setShowItem(false);
    setSelectedTypes([]);
    setTimeout(() => {
        setActiveTab('wasteType');
        resetCheckbox();
      }, 500);
    setSelectedImage(null);
  };

  const resetCheckbox = () => {
    const box = document.getElementsByClassName('box');
    const boxArray = Array.from(box);
    boxArray.map((value,index)=>{
        box[index].checked=false;
    })   
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } 
    else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const validationCheck = () => {
    const boxes = document.getElementsByClassName('box');
    let shouldReturn = false;
    const boxArray = Array.from(boxes); 
    boxArray.map((value,index)=>{
        if( boxArray[index].checked === true)
        {
            handleTabChange('image');
            shouldReturn = true;
        }
    })
    if(shouldReturn)
        return;
    const errorAnimation = document.getElementById('container')
    errorAnimation.classList.add('error');
    setTimeout(() => {
        errorAnimation.classList.remove('error');
      }, 1000);
    return false;
  } 


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const validationCheckImage = () => {
    if(selectedImage)
        handleSubmit();
    else
    {
      const errorAnimation = document.getElementById('container')
      errorAnimation.classList.add('error');
      setTimeout(() => {
        errorAnimation.classList.remove('error');
      }, 1000);
      return;
    }
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

    let wasteData = new FormData();
    wasteData.append('userId',state._id);
    wasteData.append('desc','UI not ready');
    wasteData.append('status','Pending Collection');
    const time = prettyTime( new Date() );
    console.log(time);
    wasteData.append('date',time);
    wasteData.append('wasteTypes',selectedTypes);
    wasteData.append('waste_image',selectedImage);
    wasteData.append('location',JSON.stringify({
      type: 'Point',
      coordinates: [-74.005974, 40.712891]
    }));

    await fetch('http://localhost:5656/wasteRequests',{
      method:'POST',
      body:wasteData
    }).then( (response) => response.json() ).then( (data) => {
      if( data.status === 200)
      {
        /*let addWasteEvent = new CustomEvent('displayNewWaste',{
          detail:{
            value:data.wasteData
          },
          bubbles:true
        });*/
        //document.dispatchEvent(addWasteEvent);
        dNewWaste(data.wasteData);
        console.log("Event emitted ss");
      }
      console.log(data.message)
  })


    let addWasteEvent = new CustomEvent('displayNewWaste');
    document.dispatchEvent(addWasteEvent);
    toggleItemBox();
  }

  return (
    <div className={`item-box ${showItemBox ? 'active' : ''}`} id='container'  ref={controlClickRef}>
      <button className="closeButton" onClick={toggleItemBox}>×</button>
      <div className="content">
        <div className={`tab waste-type-tab ${activeTab === 'wasteType' ? 'active' : ''}`}>
          <h2>Waste Type</h2>
          <p>Select the type of waste:</p>
            <label><input className="box"  type="checkbox" value="plastic" onChange={handleCheckboxChange} /> Plastic</label>
            <label><input className="box" type="checkbox" value="metal" onChange={handleCheckboxChange} /> Metal</label>
            <label><input className="box" type="checkbox" value="paper" onChange={handleCheckboxChange} /> Paper</label>
          <button className="next-btn" onClick={() => validationCheck()}>Next</button>
        </div>
        <div className={`tab image-tab ${activeTab === 'image' ? 'active' : ''}`}>
          <h2>Add Images</h2>
          <input type="file" accept="image/*" onChange={handleImageChange}/>         
          {selectedImage && (
          <div>
            <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '150px' ,borderRadius:'5px'}} />
          </div>
      )}
      <section>
          <button className="back-btn" onClick={() => handleTabChange('wasteType')}>Back</button>
           <span>
            <button className="submit-btn" onClick={validationCheckImage}>Submit</button>          
          </span>

      </section>

        </div>
      </div>
    </div>
  );
}

export default AddItems