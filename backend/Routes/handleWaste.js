const express = require('express');
const multer = require('multer');
const router = express.Router();
const {storeWasteRequest} = require('../Controllers/wasteManagement/storeWasteRequest');
const {getWasteRequest} = require('../Controllers/wasteManagement/getWasteRequest');
const {deleteWasteRequest} = require('../Controllers/wasteManagement/deleteWasteRequest');


const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 }});

router.post('/addWasteRequest',upload.single('waste_image'),async (req,res) => {
    try{
        console.log("Received Waste Store request");
        const resp = await storeWasteRequest(req.body);
        res.send(resp);
    }
    catch (error) {
        console.log("Error caught:", error);
        if (error instanceof multer.MulterError) {
            console.log(12);

            if (error.code === 'LIMIT_FILE_SIZE') {
                console.log(1);
                res.status(400).send({ error: 'File size too large.', type: 'size' });
            } else {
                console.log(1);

                res.status(500).send({ error: 'Multer error.', type: 'multer' });
            }
        } else {
            // Other error handling
            res.status(500).send({ error: error.message, type: 'other' });
        }
        console.log("Error " + error.message);
    }
})

router.get('/getWasteRequest' , async (req , res) => {
    try{

        console.log("Received request to retrieve waste data");
        const data = req.query.id;
        console.log(data);
        const resp = await getWasteRequest(data)
        res.send(resp);

    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
})

router.post('/deleteWasteRequest' , async (req , res) => {
    try{

        console.log("Received request to delete waste data");
        console.log(req.body);
        const resp = await deleteWasteRequest(req.body)
        res.send(resp);
    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    } 
})

module.exports = router;