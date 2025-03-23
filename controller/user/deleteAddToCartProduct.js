const CartProduct = require('../../models/CartProduct');

const deleteCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const productId = req.body._id
        
        const deleteProduct=await CartProduct.deleteOne({_id:productId})        
        res.status(200).json({
            data:deleteProduct,
            message: "Product deleted successfully",
            success: true,
            error: false,
        });

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    }
};

module.exports = deleteCartProduct;