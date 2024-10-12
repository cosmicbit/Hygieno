// Popup.js
import React, { useState } from 'react';
import '../../styles/CollectorHome/Popup.css';

const Popup = ({ num,isOpen, sendDataToParent, wrqid }) => {
  const [dataToSend, setDataToSend] = useState();


    const closePopup = (data) => {
      // Call the callback function passed from the parent with the data
      sendDataToParent(num,false,data);
      console.log('12',num,false,data);
    };
  
    async function updateStatus(){
      console.log('wrqid=',wrqid);
      const res = await fetch(`http://localhost:5656/updateWasteRQStatus?id=${wrqid}`, {
        method: 'POST',
      });
      console.log('res ',res);
      const response = res.json();
      response.then( (data) => {
        //console.log(data);
        closePopup(true);
      }).catch( err =>   {
        console.log(err);
        closePopup(false);
      });
    }
  
  const onYes = () =>{
      updateStatus();
  }
  const onNo = () =>{
    closePopup(false);
  }

  return (
    <div>
      {isOpen && (
        <div className="popupContainer">
          <div className="popupContent">
            <span className="closeBtn" onClick={onNo}>&times;</span>
            <p>Are you sure you picked this up?</p>
            <div className='buttons'>
                <button onClick={onYes}>
                    Yep
                </button>
                <button onClick={onNo}>
                    Nope
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
