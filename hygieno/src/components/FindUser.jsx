import "../styles/searchUI.css"
import React, { useState } from 'react';


function FindUser(props) {
    const [locationFilter, setLocationFilter] = useState('');

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleSearch = () => {
    // Logic to perform search based on locationFilter
    console.log('Searching for waste collectors in:', locationFilter);
  };

  return (
    <div className='services'>
      <div className="waste-collector-search-container">
      {
        (() => {
          if (props.userType === 'collector') {
            return <h2>Search Waste Disposers</h2>;
          } else if(props.userType === 'disposer'){
            return <h2>Search Waste Collectors</h2>;
          }
        })()
      }
      
      <div className="search-input">
        <input
          type="text"
          placeholder="Enter location"
          value={locationFilter}
          onChange={handleLocationFilterChange}
        />
        <button className='searchButton'onClick={handleSearch}>Search</button>
      </div>
      {/* Additional UI components for displaying search results can be added here */}
    </div>
    </div>
    
  );
}



export default FindUser