import React , { useContext, useState ,useRef, useEffect}from 'react';
//import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { wasteData } from '../pages/DisposerHome'
import '../styles/activity.css'
import { RiArrowDropDownLine } from "react-icons/ri";


function Activity( {  handlewasteDelete , reportRender } ) {


const {wasteDetails} = useContext(wasteData);
const [showStatusOptions,setshowStatusOptions] = useState(new Array(wasteDetails.length).fill(true));

const [deleteWasteTab,setdeleteWasteTab] = useState({
  index:null,value:null
});
const checkClick = useRef();

if(wasteDetails.length < 1)
  reportRender();

useEffect(() => {
  const handleClick = (event) => {
      if(event.target.closest(".activityHeader") === checkClick.current )
          handlerenderNormal();
  }

      checkClick.current.addEventListener('click', handleClick);
  return () => {
      if (checkClick.current) 
          checkClick.current.removeEventListener('click', handleClick);
  };
}, []);

const handlerenderNormal = ()=>{
  reportRender();
}

  console.log("acc")
  const activityObjects = [];
  for (let index = 0; index < wasteDetails.length; index++) {
    const value =  wasteDetails[index];
    const activityObject = {
      key: index,
      date: value.date,
      type: value.wasteTypes,
      collector: value.collectorDetails[0].firstName,
      desc: value.desc,
      status: value.status
    };
    activityObjects.push(activityObject);
  }


  return (
    <div className="activityContainer">
      <div className="activityContent">
        <div className="activityHeader" ref={checkClick}>
            <h2>Your Activity</h2>
            <span><RiArrowDropDownLine  onClick={handlerenderNormal}  /> </span>
        </div>     
      <div>
          {activityObjects.map((activityObject) => (
            <div key={activityObject.key} className="activity">
              <div className="waste-card">
                <div className="left-content">
                  <ul style={{ listStyleType: 'none' }}>
                    <li>{activityObject.date}</li>
                    <li id='main'>{activityObject.type}</li>
                    <li>Collector: {activityObject.collector}</li>
                  </ul>
                </div>
                <div className="right-content">
                <div className={`statusDetails  ${ deleteWasteTab.value &&  deleteWasteTab.key === activityObject.key  ? 'hide' : ''}`}>
                    <h4>Status : {activityObject.status}</h4>
                    { activityObject.status !== 'Completed' ?
                    <div className="icons">
                        <GiCancel className='ico'  onClick={()=>setdeleteWasteTab({
                          key:activityObject.key,
                          value:true
                        })}></GiCancel>
                    </div>
                    : ''
                    }
                </div>
                {
                    deleteWasteTab.value &&  deleteWasteTab.key === activityObject.key &&
                    <div className="delete">
                        <h4>Are you sure?</h4>
                        <section>
                            <button onClick={()=>setdeleteWasteTab({
                          key:null,
                          value:false
                        })}  id='cancel-bT'>Cancel</button> <span><button customKey={activityObject.key}  id='delete-bT' onClick={(e)=>{
                                handlewasteDelete(e.target.getAttribute('customKey'));
                                wasteDetails.splice(activityObject.key, 1);
                                setdeleteWasteTab({
                                  key:null,
                                  value:false
                                })}}>Delete</button></span>
                        </section>
                    </div>
                }           
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activity;
