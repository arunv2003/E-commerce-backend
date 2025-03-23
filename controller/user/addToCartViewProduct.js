const CartProduct = require("../../models/CartProduct")

const addToCartViewProduct = async (req, res) => {
    try {
        const userId=req.userId
        const allProduct=await CartProduct.find({userId}).populate("productId")
        res.json({
            data:allProduct,
            message:'ok',
            success:true,
            error:false
        })


    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true,

        })
    }
}
module.exports=addToCartViewProduct