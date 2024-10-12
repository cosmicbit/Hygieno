const express = require('express');

const router = express.Router();
const { getNewRqFromD } = require('../Controllers/CollectionAreaManagement/getNewRqFromD');
const { getNewWRQDetails } = require('../Controllers/CollectionAreaManagement/getNewWRQDetails');


router.get('/getNewRqFromD' ,async (req , res) => {
    try{

        console.log("\n\n******\n\nReceived request to retrieve new Requests for any collection area\n\n******\n\n");
        const data = req.query.id;
        console.log(data);
        const resp = await getNewRqFromD(data)
        res.send(resp);

    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
});

router.post('/getNewWRQDetails' ,async (req , res) => {
    try{

        console.log("\n\n******\n\nReceived request to retrieve new Requests details for a particular collection area\n\n******\n\n");
        const data = req.body;
        console.log(data);
        const resp = await getNewWRQDetails(data)
        res.send(resp);

    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
});

module.exports = router;