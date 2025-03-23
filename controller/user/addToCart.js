const CartProduct = require("../../models/CartProduct")

const addToCart = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await CartProduct.findOne({ productId })
        if (isProductAvailable) {
            return res.json({
                message: 'already added in cart',
                success: false,
                error: true
            })
        }
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }
        const newAddToCart = new CartProduct(payload)
        const saveData = await newAddToCart.save()
        res.json({
            message: "item added in cart",
            success: true,
            error: false,
            data: saveData
        })
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true,

        })
    }
}
module.exports=addToCart
