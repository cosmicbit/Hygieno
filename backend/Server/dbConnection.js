const mongo = require('mongoose');
const connectDb = async () => {
    try
    {
       const conObj = await mongo.connect(process.env.DB_URL)
       console.log(`Database Connected ${conObj.connection.host}`);
       //await listDatabases(mongo);
    }
    catch(e)
    {
        console.log("Database Connection Failed.");
        console.log(e);
    }
}
/*async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};*/
module.exports = connectDb , mongo;