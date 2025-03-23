const productsModel = require("../../models/productsModel");

const getProductDetail = async (req, res) => {
    try {
        const {productId}=req.body
        const product=await productsModel.findById(productId)
        res.json({
            data:product,
            success:true,
            error:false,
            message:'Ok'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}
module.exports =getProductDetail