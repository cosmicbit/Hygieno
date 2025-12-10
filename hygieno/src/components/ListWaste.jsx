import React,{useState,useContext}from 'react'
import '../styles/listWaste.css'
import trashcan from '../assets/plus.png';
//import AddItems from '../components/AddItems';
import { GrFormNext } from "react-icons/gr";
import wastePreiew from '../assets/noun-gallery-3783249.png'
import { wasteData } from '../pages/DisposerHome';
import { dNewWaste } from './WasteCard';

function ListWaste() {
  const typeWaste = ['Plastics' , 'Metal' , 'E-Waste' , 'Paper' , 'Medical ' , 'Organic' , 'Hazardous' ];

  const [activeTab, setActiveTab] = useState('wasteType'); 
  const [others,setothers] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const {state} = useContext(wasteData)
  const [checked, setChecked] = useState(new Array(typeWaste.length).fill(false));
  const [collectorData,setcollectorData] = useState([]);

  const [checkedC, setCheckedC] = useState(-1);
  var tempWDetails;
  const handleCheckboxChange = (index,state) => {
    console.log("Selected "+typeWaste[index] + state)
    if (state) {
      setSelectedTypes([...selectedTypes, typeWaste[index]]);
    } 
    else {
      setSelectedTypes(selectedTypes.filter((type) => type !== typeWaste[index]));
    }
    console.log(selectedTypes);
  };

  const verifySelectedtypes = ()  => {
    if(selectedTypes.length < 1)
    {
      const errorAnimation = document.getElementById('containerLWD')
      errorAnimation.classList.add('error');
      setTimeout(() => {
          errorAnimation.classList.remove('error');
        }, 1000);
    }
    else
        setActiveTab('image');
  }

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result); //base64encoded string
        console.log('setSelectedImage = ',event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const validationCheckImage = () => {
    if(selectedImage && state.location)
    {
      setActiveTab('findCollectors')
      return
    }
    else
    {
      const errorAnimation = document.getElementById('containerLWD')
      errorAnimation.classList.add('error');
      setTimeout(() => {
        errorAnimation.classList.remove('error');
      }, 1000);
      return;
    }
  }

  const searchCollectors = async () => {
    if(!state.location)
    {
      if(selectedImage)
      {
        alert("Update your location");
        return;
      }
      else
        return;
    }
    
    console.log(state);
    const url = `${process.env.REACT_APP_URL}:5656/findCollectors`;
    const response = await fetch(url,{
      method:"POST",
      body:JSON.stringify(state.location),
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(response.ok)
    {

      let res = response.json();
      res.then( (d) => {
        setcollectorData(d) 
      //  console.log(collectorareaData);
      }).catch( (er) => {
        console.log(er);
        alert("Error finding collectors");
      });
    }
    else
    {
      alert("Sorry no collectors nearby");
      window.location.reload(true);
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
    const wasteData = new FormData();
    try{

        if( checkedC === -1 )
        {
          alert("Choose a collector");
          return;
        }
     
      wasteData.append('location',JSON.stringify({
        type: 'Point',
        coordinates: [state.location.lon, state.location.lat]
      }));

      wasteData.append('userId',state._id);
      wasteData.append('disposername',state.firstName);
      wasteData.append('desc','UI not ready');
      wasteData.append('status','Pending Collection');
      const time = prettyTime( new Date() );
      console.log(time);
      wasteData.append('date',time);
      wasteData.append('wasteTypes',selectedTypes);
      console.log(selectedTypes)
      wasteData.append('waste_image',selectedImage);
     // alert(collectorData[checkedC].firstName);
      wasteData.append('collectionarea',collectorData[checkedC]._id);
      wasteData.append('collector',collectorData[checkedC].userId);

      console.log("waste data",wasteData.get("waste_image"))
     // wasteData.append('collectionArea',collectorareaData[checkedC]._id)
  }
  catch(er)
  {
    console.log("error in form data ",er);
  }
  console.log("waste data",wasteData.get("waste_image"))
    await fetch('http://localhost:5656/addWasteRequest',{
      method:'POST',
      body:wasteData
    }).then( (response) => response.json() ).then( (data) => {
      if( data.status === 200)
      {
        dNewWaste(data.wasteData);
        console.log("Event emitted ss");
      }
      else
        alert(data)
      console.log(data.message)
  }).catch((e)=>{ 
    if(e.type === 'multer')
      alert('Size too high');
    console.log(e)
  })
  window.location.reload(true);

}

  return (
    <div className="services" >  
        {console.log(activeTab)};
        <div className="wasteMenuContainer" id='containerLWD' >
          <div className={`wasteType  ${activeTab === 'wasteType' ? 'active' : ''}`}>
            <h3>Select Waste Type</h3>
            <div className='wasteTypesOption'>
              {
                typeWaste.map((value,index) => (
                        <button key={index} className={` ${checked[index] ? 'green' : '' }`}  value={checked[index]} onClick={(e)=>{
                             setChecked( (data) => {
                              const newChecked = [...data];
                              newChecked[index] = !data[index];
                              console.log(newChecked[index]);
                              handleCheckboxChange(index,newChecked[index])
                              return newChecked;
                            });
                            }}>{value}</button>
                  )
                )
              }
            </div>
            <GrFormNext className='nextIcon' onClick={verifySelectedtypes}/>
          </div>
            <div className={`wasteImageContainer  ${activeTab === 'image' ? 'active' : ''}`}>
                <h3 >Add Images</h3>
                { selectedImage ? 
                                    <img src={selectedImage} alt="Uploaded" className='selectedWastePreview' style={{  borderRadius:'5px'}} />
                                :
                                    <img src={wastePreiew} className='wastePreview'  alt="Uploaded" style={{ borderRadius:'5px'}} />     }
     
                <input className='wasteImgFile' type="file" accept="image/*" onChange={handleImageChange}/>         
                
                <GrFormNext className="backIcon" onClick={() => setActiveTab('wasteType')}/>
                <GrFormNext className="nextIconImage" onClick={ ()=> {
                  validationCheckImage();
                  searchCollectors();
                  }}/>        
           </div>
           <div className={`findCollectors ${activeTab === 'findCollectors' ? 'active' : ''}`}>
                  <h3>Choose a collector</h3>
                  {
                    collectorData.map( (value,index) => (
                      <div   key={index} className={`collectorDetails ${checkedC === index ? 'green' : '' }`}  onClick={(e)=>{
                        setCheckedC(index);
                       }}>
                          
                          <h4 className='place'>{`Place : ${value.area}`}</h4>
                          <h4 className='phone'>{`Phone : ${value.collectorDetails[0].phoneNo}`}</h4>
                          <h4 className='rating'>{`Rating : 3/5`}</h4>
                      </div>
                    ))
                   
                  }
                  <GrFormNext className="backIconC" onClick={() => setActiveTab('image')}/>
                  <button className='submitC' onClick={handleSubmit}>Submit</button>
           </div>
        </div>
    </div>     
  )
}

export default ListWaste;