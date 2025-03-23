// const productsModel = require("../models/productsModel");

const productsModel = require("../../models/productsModel");

const getProducts = async (req, res) => {
    try {
        const allProducts=await productsModel.find().sort({createdAt:-1})
        res.json({
            allProduct:allProducts,
            success:true,
            error:false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}
module.exports=getProducts