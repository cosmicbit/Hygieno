
const opencage = require('opencage-api-client');
const API_KEY = 'cd06fa7e977c4a14a72e75caa0435167';

const ReverseGeocode = (coordinates) => {
    const coordinatesString = coordinates.join(',');
    return opencage
        .geocode({ 
            q: coordinatesString, 
            language: 'en', 
            key: API_KEY, 
            limit:1,
            pretty:1 
        })
        .then((data) => {
        //console.log(JSON.stringify(data));
        if (data.status.code === 200 && data.results.length > 0) {
        const place = data.results[0];
        formattedAddress = place.formatted;
        console.log(formattedAddress);
        console.log(place.components.road);
        console.log(place.annotations.timezone.name);
        return formattedAddress;
        } else {
        console.log('status', data.status.message);
        console.log('total_results', data.total_results);
        }
        })
    .catch((error) => {
        console.log('error', error.message);
        if (error.status.code === 402) {
        console.log('hit free trial daily limit');
        console.log('become a customer: https://opencagedata.com/pricing');
        }
    });
};

module.exports = ReverseGeocode;
// ... prints
// 1330 Middle Avenue, Menlo Park, Californie 94025, États-Unis d'Amérique
// Middle Avenue
// America/Los_Angeles