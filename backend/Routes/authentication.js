const express = require('express');
const router = express.Router();
const { validateUser } = require('../Controllers/authentication/validateUser.js');
const { registerUser } = require('../Controllers/authentication/registerUser.js');



router.post('/login',async (req,res) => {
    try{
        console.log("Received a request.");
        console.log(req.body);
        const respp = await validateUser(req.body); 
        res.send(respp);
    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    }   
})

router.post('/signup',async (req,res) => {
    try{
        console.log("Received a request.");
        console.log(req.body);
        const respp = await registerUser(req.body); 
        console.log(respp);
        res.send(respp);
    }
    catch(error){
        res.send(error.message);
        console.log("Error "+error.message);
    }  
})

module.exports = router;