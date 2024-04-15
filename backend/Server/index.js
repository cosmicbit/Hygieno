//configuration
require('dotenv').config();
const connectDb = require('./dbConnection.js');
const express = require('express');
const cors = require('cors');
const app = express();


//essentials
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
connectDb();

//route functions
const authentication = require('../Routes/authentication.js');
const handleWaste = require('../Routes/handleWaste.js');
const handleCollectionAreaRequest = require('../Routes/handleCollectionAreaRequests.js');

//routes
app.post('/login',authentication);
app.post('/signup',authentication);

app.post('/wasteRequests',handleWaste);
app.get('/wasteRequests',handleWaste);

app.post('/collectionAreaRequests',handleCollectionAreaRequest);
app.get('/collectionAreaRequests',handleCollectionAreaRequest);

app.listen(5658 , () => {
    console.log("Listening ")
});
