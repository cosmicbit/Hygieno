import React , { useState, useEffect }from "react";
import '../../styles/ShowWRinC.css';
import { useLocation } from "react-router-dom";
import Popup from "./Popup";

const ShowWRinC = ({state, data, sendDataToParent}) => {
  
    console.log("loker");
    
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [pickupButtonValue,setPickupButtonValue]=useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [popupID,setPopupID]= useState();
    const [currentWasteRQ,setCurrentWasteRQ] = useState(null);
    const [newRqFromD,setNewRqFromD] = useState();

    const [isOpen, setIsOpen] = useState(false);
    let newRequests;

    async function fetchNewRqdetailsFromD() {
      console.log('41 data',data);
      const res = await fetch('http://localhost:5656/getNewWRQDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('res  ',res);
      const response = res.json();
      response.then( (dt) => {
        console.log(dt);
        console.log(dt.newRqFromD);
        //newRequests=dt.newRqFromD;
        setNewRqFromD(dt.newRqFromD);
        setComponentLoaded(true); // Set the componentLoaded state to true after data fetching completes
      }).catch( err =>   console.log('fetch error',err))
    }

  useEffect( () => {
    fetchNewRqdetailsFromD();
  },[data]);

  useEffect(() => {
    setPickupButtonValue([]);
    setDisabledButtons([]);
    setPopupID();
    setCurrentWasteRQ();
  },[newRqFromD])
  

    const handleDataFromChild = (index,statusonpopup,statusonpickup) => {

      setIsOpen(statusonpopup);
      if(statusonpickup){
        sendDataToParent();
        fetchNewRqdetailsFromD();
      }
      const updatedDisabledButtons = [...disabledButtons];
      updatedDisabledButtons[index] = statusonpickup;
      console.log('disabled',disabledButtons);
      setDisabledButtons(updatedDisabledButtons);
      const updatedPickupButtonValue = [...pickupButtonValue];
      updatedPickupButtonValue[index] = statusonpickup;
      setPickupButtonValue(updatedPickupButtonValue);

    };
    
    console.log("37 bloker");
    console.log('38 data',data);
    //implement passing session id to fetch waste orders to have increased security later
  
  

  const ROWS_PER_PAGE = 10; // Define how many rows per page
  const [currentPage, setCurrentPage] = useState(0);
  // Calculate the index range of rows for the current page
  const startIndex = currentPage * ROWS_PER_PAGE;
  const endIndex = (currentPage + 1) * ROWS_PER_PAGE;
  // Handle pagination
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePickupBClick = async (index,WRQid) => {
    setIsOpen(true);
    setPopupID(index);
    setCurrentWasteRQ(WRQid);
    
  };
  
  if (!componentLoaded) {
    return (
      <div>
        Please wait while we're fetching the data for you...<br></br>
        Patience will do the effect of GOAT soup...
      </div>
    ); // Render nothing until the componentLoaded state becomes true
}


    return(
      <div className="WasteRQSection">
        <Popup 
          num={popupID}
          isOpen={isOpen} 
          sendDataToParent={handleDataFromChild}
          wrqid={currentWasteRQ}
        />
        <h2>Waste Requests</h2>
        <div className="table-container">
          
            
          <div className="table-body">
                <table className="WRQ-table">
                    <tbody>
                    {
                    newRqFromD.newRequests_disposernames.map((item,index) => {
                        console.log(item);
                        const imageUrl = `${newRqFromD.newRequests_images[index]}`;
                        return (
                          <tr key={item.id}>
                              <td style={{ width: '50px' }}>{index + 1}</td> 
                              <td style={{ width: '600px' }}>
                                  Name: {item}<br/>
                                  Date of Request: {newRqFromD.newRequests_dates[index]}<br/>
                                  Address:<br/>
                                  Image: 
                                  
                                  <img 
                                    src={imageUrl} 
                                    width= {200}
                                    height= {200}
                                  />
                                  
                              </td>
                              <td style={{ width: '200px' }}>
                                  <button 
                                    key={index} 
                                    onClick={()=>handlePickupBClick(index,newRqFromD.newRequests_ids[index])} 
                                    disabled={disabledButtons[index]}
                                    className="pickupButton"
                                  >
                                  {pickupButtonValue[index] ? 'Picked Up' : 'Pick Up'}
                                  </button>
                                  {console.log('index=',index)}
                                  
                              </td>
                              
                          </tr>
                        ); 
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
            <span>Page {currentPage + 1}</span>
            <button onClick={nextPage} disabled={endIndex >= newRqFromD.newRequests_disposernames.length}>Next</button>
        </div>
      </div>
    );
  };

  export default ShowWRinC;