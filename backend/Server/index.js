//configuration
require('dotenv').config();
const connectDb = require('./dbConnection.js');
const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const cors = require('cors');
const wasteRequestsCollection = require('../SchemaModels/wasteRequests.js');
const app = express();
//essentials
app.use(cors());
/*app.get('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    // ... rest of your route handling logic
  });*/
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const server = http.createServer(app);

connectDb();

//route functions
const authentication = require('../Routes/authentication.js');
const handleWaste = require('../Routes/handleWaste.js');
const handleCollectionAreaRequest = require('../Routes/handleCollectionAreaRequests.js');
const findCollector = require('../Routes/findCollector.js');
const updateLocation = require('../Routes/updateLocation.js');
const newrqfromd = require('../Routes/handleNewRqFromD.js');
const getNewWRQDetails = require('../Routes/handleNewRqFromD.js');
const updateWRQStatus = require('../Routes/handleWRQStatus.js');


//routes
app.post('/login',authentication);
app.post('/signup',authentication);

app.post('/addWasteRequest',handleWaste);
app.get('/getWasteRequest',handleWaste);
app.post('/deleteWasteRequest',handleWaste);

app.post('/collectionAreaRequests',handleCollectionAreaRequest);
app.get('/collectionAreaRequests',handleCollectionAreaRequest);
app.get('/getNewRqFromD',newrqfromd);
app.post('/getNewWRQDetails',getNewWRQDetails)
app.post('/updateWasteRQStatus',updateWRQStatus);

app.post('/findCollectors',findCollector);

//setting up socket io for reporting status changes
const {Server} = require('socket.io');

    const io = new Server(server, {
        cors: {
        origin: "http://localhost:3000"
        }
    });
  //const io = socket(server);
   io.on('connection', (socket) => {
    console.log('A user connected');

   
    socket.on('myDetails' , (data) => {
        console.log("nokkadx",data);
        const obj = require('mongoose').Types.ObjectId;
        const mainObj = new obj(data);
        const pipeline = [
            {
                $match : {
                    userId : mainObj
                }
            }
        ]
        const changeStream = wasteRequestsCollection.watch({ fullDocument: 'updateLookup' });
        changeStream.on('change', (next) => {
            console.log("1");
            if( next.operationType === 'update')
            {
                socket.emit('statuschange',{
                    Status : next.fullDocument.status,
                    ID : next.fullDocument._id
                });
                console.log("send");
            }
        })
    })
       

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(process.env.PORT , () => {
    console.log("Listening ")
});