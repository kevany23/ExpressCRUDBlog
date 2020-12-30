const { MongoClient } = require("mongodb");
const config = require('./config');

const uri = config.MONGO_URI;
var database;
/*
Note: Don't forget to make sure Mongo process is running
*/
client = new MongoClient(uri, {useUnifiedTopology: true});
async function main() {
  try {
    await client.connect();
    console.log("Database Connected!");
    database = client.db("postProject");
    //await database.collection("posts").insertOne({username: 'foo', content: 'hello world'});
  } catch (e) {
    console.log("Connection error");
    console.log(e);
  } finally {
    //await client.close();
    module.exports.database = database;

  }
}

main();