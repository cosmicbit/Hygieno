const express = require('express');

const router = express.Router();
const {updateWRQStatus} = require('../Controllers/CollectionAreaManagement/updateWRQStatus');


router.post('/updateWasteRQStatus',async (req,res) => {
    try{
        console.log("\n\n**************\n\nReceived request to update status of WRQ\n\n**************\n\n");
        const data = req.query.id;
        console.log(data);
        const resp = await updateWRQStatus(data)
        res.send(resp);
    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
});

module.exports = router;