const express = require('express');
const multer = require('multer');
const router = express.Router();
const { storeCollectionAreaRequest } = require('../Controllers/CollectionAreaManagement/storeCollectionAreaRequest');
const { getCollectionAreaRequest } = require('../Controllers/CollectionAreaManagement/getCollectionAreaRequest');


const upload = multer({ storage: multer.memoryStorage()});
router.post('/collectionAreaRequests' ,upload.single('waste_image'), async (req,res) => {
    try{
        console.log("\n\n**************\n\nReceived Collection Area request");
        const resp = await storeCollectionAreaRequest(req.body);
        res.send(resp);
    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    }   
});

router.get('/collectionAreaRequests' ,async (req , res) => {
    try{

        console.log("\n\n**************\n\nReceived request to retrieve collection area data");
        const data = req.query.id;
        console.log(data);
        const resp = await getCollectionAreaRequest(data)
        res.send(resp);

    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
});
/*
router.post('/collectionAreaRequests/delete' , async (req , res) => {
    try{

        console.log("Received request to delete waste data");
        const resp = await deleteWasteRequest(req.body)
        res.send(resp);
    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
})
*/
module.exports = router;