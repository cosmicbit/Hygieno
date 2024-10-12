const mongoose  = require('mongoose');
const { Schema } = mongoose;

//collector Schema
const collectorSchema = new Schema({

    firstName:{
      type:String,
      required:true
    },

    middleName:{
      type:String
    },

    lastName:{
      type:String
    },

    email:{
      type : String,
      unique:true,
      required:true
    },

    password:{
      type:String,
      required:true
    },

    userType:{
      type:String
    },

    phoneNo:{
      type:String,
      required:true,
      unique:true
    }
})

//disposer schema
const disposerSchema = new Schema({

  firstName:{
    type:String,
    required:true
  },

  middleName:{
    type:String
  },

  lastName:{
    type:String
  },

  email:{
    type : String,
    unique:true,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  userType:{
    type:String
  },

  phoneNo:{
    type:String,
    required:true,
    unique:true
  }

})

collectorSchema.index({ location: '2dsphere' });
collectorSchema.index({ email: 1 }, { unique: true });
collectorSchema.index({ phoneNo: 1 }, { unique: true });
disposerSchema.index({ email: 1 }, { unique: true });
disposerSchema.index({ phoneNo: 1 }, { unique: true });

const collector = mongoose.model('collectorusers',collectorSchema);
const disposer = mongoose.model('disposerusers',disposerSchema);

const User = { collector , disposer };
module.exports = User;



