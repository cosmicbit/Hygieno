import "../styles/searchUI.css"
import React, { useState } from 'react';

function Search() {
  const [locationFilter, setLocationFilter] = useState('');

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleSearch = () => {
    // Logic to perform search based on locationFilter
    console.log('Searching for waste collectors in:', locationFilter);
  };

  return (
    <div className="waste-collector-search-container">
      <h2>Search Waste Collectors</h2>
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
  );
}

function WasteDisposerSearch() {
  const [locationFilter, setLocationFilter] = useState('');

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleSearch = () => {
    // Logic to perform search based on locationFilter
    console.log('Searching for waste collectors in:', locationFilter);
  };

  return (
    <div className="waste-collector-search-container">
      <h2>Search Waste Disposers</h2>
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
  );
}

export default Search;
