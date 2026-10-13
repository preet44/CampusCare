const mongoose = require("mongoose");
//Imports Mongoose to connect Node.js with MongoDB.

const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    //Connects to MongoDB using the MongoDB URL stored in .env.
    console.log("MongoDB is Connected")
    }catch(error){
        console.error("MongoDB Connection Failed:",error.message);
    }
}
module.exports = connectDB;