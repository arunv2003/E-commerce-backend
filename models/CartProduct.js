const mongoose = require('mongoose')


const addToSchema = new mongoose.Schema({
    productId: {
        type: String,
        ref:'products'
    },
    quantity:{
        type:Number
    },
    userId:{
        type:String
    },
    selling:{
        type:Number
    }
}, { timestamps: true })


module.exports = mongoose.model("addToCart", addToSchema)