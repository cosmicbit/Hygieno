const User  = require('../../SchemaModels/userSchema')

module.exports.validateUser = async (userCredentials) => {
    console.log("hey");
    if(userCredentials.usertype === "Disposer")
      var user = await User.disposer.findOne({email:userCredentials.email} );
    else if(userCredentials.usertype === "Collector")
      var user = await User.collector.findOne({email:userCredentials.email} );
    else
      return "UserType is not defined."
    
    if(!user){
      console.log("Failed");
      return [{
        status:404,
        message:"User not found . Check your email."
      }]
    }
    else{
      console.log("Success");
      if(user.password === userCredentials.password){
        console.log('Password matched');
        const resData = {
          _id: user._id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          phoneNo: user.phoneNo,
        }
        return [{
          status:200,
          message:"You have been authenticated.",
          usertype:userCredentials.usertype
        },resData]
      }
      else
        return [{
          status:404,
          message:"Wrong Password",
          usertype:userCredentials.usertype
      }]
    }
  }