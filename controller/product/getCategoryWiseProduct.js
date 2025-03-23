const productsModel = require("../../models/productsModel");

const getCategoryWiseProduct = async (req,res) => {
    try {
        const {category}=req?.body||req?.query
        const product =await productsModel.find({category})
        
        res.json({
            data:product,
            success:true,
            error:false,
            message:"product"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

module.exports = getCategoryWiseProduct