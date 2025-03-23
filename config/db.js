const mongoose = require('mongoose');


const connectToMongoDB=async()=>{
  try {
    let data=await mongoose.connect('mongodb://127.0.0.1:27017/E-commerce-Website')
    console.log('server is connected to mongoDB')
  } catch (error) {
    console.log("server is not connected to mongoDB")
  }
}
module.exports=connectToMongoDB