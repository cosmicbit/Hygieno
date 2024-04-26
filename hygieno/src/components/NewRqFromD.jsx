import React , { useState, useEffect}from "react";
import { useLocation } from "react-router-dom";
import ShowWRinC from './CollectorHome/ShowWRinC'
import '../styles/NewRqFromD.css';

function NewRqFromD(props){
  const {state}=useLocation();
  const [newRqFromD,setNewRqFromD] = useState([]);
  const [showRQ,setShowRQ]=useState(false);
  console.log('ok');
  useEffect( () => {
    //implement passing session id to fetch waste orders to have increased security later
    async function fetchNewRqFromD() {
      const res = await fetch(`http://localhost:5656/getNewRqFromD?id=${props.state._id}`, {
        method: 'GET'
      });
      const response = res.json();
      response.then( (data) => {
        console.log(data);
        console.log(data.newRqFromD);
        setNewRqFromD(data.newRqFromD);
      }).catch( err =>   console.log(err))
    }
    fetchNewRqFromD();
  },[])

  const showRQSection = (data) =>{

    setShowRQ(data);
  }

  const ROWS_PER_PAGE = 10; // Define how many rows per page

  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the index range of rows for the current page
  const startIndex = currentPage * ROWS_PER_PAGE;
  const endIndex = (currentPage + 1) * ROWS_PER_PAGE;
  console.log(newRqFromD);
  // Get the data to be displayed on the current page
  const currentPageData = newRqFromD.slice(startIndex, endIndex);

  // Handle pagination
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return(
    <div className="wasteRQSection">
      <div className="table-container">
        <div className="table-header">
          <h2>Collection Area</h2>
          <table className='custom-table'>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th> {/* Fixed width for this column */}
                <th style={{ width: '1100px' }}>Area</th>
                <th>New Waste Requests</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-body">
          <table className="custom-table">
            <tbody>
              {currentPageData.map((item,index) => {
                console.log(item);
                return (
                  <tr key={item.id} onClick={()=>showRQSection(item)}>
                    <td style={{ width: '50px' }}>{startIndex + index + 1}</td> {/* Display row number */}
                    <td style={{ width: '1100px' }}>{item.area}</td>
                    <td>{item.nofNewRqFromD}</td>
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
        <button onClick={nextPage} disabled={endIndex >= newRqFromD.length}>Next</button>
      </div>
      {showRQ ? <ShowWRinC state={state} data={showRQ}></ShowWRinC> : null }
      
    </div>
  )
}

export default NewRqFromD;