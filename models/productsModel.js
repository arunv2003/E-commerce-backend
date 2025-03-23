const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productsName:{
        type:String
    },
    brandName:{
        type:String
    },
    category: {
        type:String
    },
    productImage: [],
    description:{
        type:String
    },
    price: {
        type:Number
    },
    selling: {
        type:Number
    },
},{timestamps:true})

module.exports=mongoose.model("products",productSchema)