const express = require('express');
const router = express.Router();

const User  = require('../SchemaModels/userSchema')

router.post('/updateCollector',async (req,res) => {
    try {
        console.log("Received request for loc update");
        console.log(req.body)
        const collector = await User.collector.findByIdAndUpdate(req.body.id, {
          location: {
            type: "Point", 
            coordinates: req.body.loc,
          },
        }, { new: true }); 
    
        if (!collector) {
          console.log(`Collector with ID ${req.body.id} not found`);
          res.status(400).send(`Collector with ID ${req.body.id} not found`);
          return;
        }
        console.log(`Collector ${collector.firstName} location updated successfully!`);
      } catch (error) {
        console.error(error.message);
      }
})
module.exports = router;