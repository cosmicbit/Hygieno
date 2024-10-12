const User  = require('../../SchemaModels/userSchema')

module.exports.registerUser  = async function (userdata){
  try{
    let newUser;
    let responseData = {
      status:'',
      message:''
    }

    if(userdata.userType === "Disposer")
    {
        newUser = new User.disposer({
        email:userdata.email ,
        password:userdata.password,
        firstName:userdata.firstName,
        middleName:userdata.middleName,
        lastName:userdata.lastName,
        phoneNo:userdata.phoneNo
      });
    }
    else if(userdata.userType === "Collector")
    {
        newUser = new User.collector({
          email:userdata.email ,
          password:userdata.password,
          firstName:userdata.firstName,
          middleName:userdata.middleName,
          lastName:userdata.lastName,
          phoneNo:userdata.phoneNo
      });
    }
    else
      return "UserType not defined"

    await newUser.save().then((data) => {
        console.log('User saved successfully');
        console.log(data);
        responseData.status = 200;
        responseData.message = `User Registered Successfully`;
      })
      .catch((err) => {
        console.error('Error saving user:', err);
        if( err.name === "MongoServerError" && err.code === 11000 )
        {
          const duplicateFields = Object.keys(err.keyValue).join(' ');
          console.log(duplicateFields)
          responseData.status = 404 ;
          responseData.message = `${duplicateFields} are already registered`;
        }
      });
      return responseData;
    }
    catch(error){
      console.log("Entho Preshnam");
    }
}