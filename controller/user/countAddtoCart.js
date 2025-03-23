const CartProduct = require("../../models/CartProduct")

const countAddToCartProduct = async (req, res) => {
    try {
        const userId=req.userId
        const count=await CartProduct.countDocuments({userId:userId})

        res.json({
            message:{
                count:count,
                message:'ok',
                error:false,
                success:true
            }
        })

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true,

        })
    }
}
module.exports=countAddToCartProduct