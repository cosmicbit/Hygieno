import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet';
import L from 'leaflet';
import useGeolocation from './useGeolocation';
import customIcon from '../assets/marker_map_icon.png';
import '../styles/MapComponent.css'
export let collectionAreaCoord = [];
const MapComponent = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [mapCenter, setMapCenter] = useState([9.625805821451133, 76.76101006291614]);
    const location = useGeolocation();
    const [selectedPosition, setSelectedPosition] = useState([
        0,0
    ]);

    const mapRef = useRef(null);

    useEffect(() => {
        // Ensure Leaflet styles are loaded
        import('leaflet/dist/leaflet.css').then(() => {
            console.log('Leaflet styles have been loaded.');
        });
        
    }, []);

    useEffect(() => {
        collectionAreaCoord=[selectedPosition];
        console.log('collection coord');
        console.log(collectionAreaCoord);

    },selectedPosition);

    const Markers = () => {

        const map = useMapEvent('click',(e) => {                                
            setSelectedPosition([
                e.latlng.lat,
                e.latlng.lng
            ])
            console.log("selectedPos");
            
            console.log(selectedPosition);
            console.log("click");
            console.log(e.latlng);
            setSearchQuery(`${e.latlng.lat},${e.latlng.lng}`);
        })
        return (
            
            selectedPosition ? 
                <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false}
                icon={L.icon({
                    iconUrl: customIcon,
                    iconSize: [24, 24], // Size of the icon
                    iconAnchor: [12, 24] // Anchor point of the icon
                })}
                />
            : null
        )
        
    }

    const handleSearch = () => {
        const address = searchQuery.trim();
        if (address === '') return;

        const apiKey = 'cd06fa7e977c4a14a72e75caa0435167';
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            const { lat, lng } = data.results[0].geometry;
            setMapCenter([lat, lng]); // Update map center
            console.log(lat,lng);
            setSelectedPosition([lat,lng]);
            console.log("mapRef");
            console.log(mapRef);
            mapRef.current.flyTo([lat,lng],10);
        })
        .catch(error => console.error('Error:', error));
    };




    return (
        <div>
            <div className='search-bar'>
                <input
                    className='search-box'
                    type="text"
                    placeholder='Enter Location...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={(event) => {
                        // Check if the pressed key is Enter (key code 13)
                        if (event.key === 'Enter') {
                          // Call the search function when Enter key is pressed
                          handleSearch();
                        }}
                    }
                />
                <button className='search-button' onClick={handleSearch}>Search</button>
            </div>
            <div>
            <MapContainer 
                center={mapCenter}
                zoom={10}
                style={{ height: '550px' ,width:'550px'}}
                ref={mapRef}
            >
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    
                />
                
                <Markers></Markers>
                
                

            </MapContainer>
            </div>
            

        </div>
    );
};

export default MapComponent;