const CartProduct = require("../../models/CartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUser = req.userId; 
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity; 
        const selling = req.body.selling; 

        // Update the product in the cart
        const updateProduct = await CartProduct.updateOne(
            { _id: addToCartProductId }, // Filter: Find the product by its ID
            {
                $set: {
                    quantity: qty, 
                    selling: selling
                }
            }
        );

        // Check if the product was found and updated
        if (updateProduct.matchedCount === 0) {
            return res.status(404).json({
                message: 'Product not found',
                success: false,
                error: true
            });
        }

        // Fetch the updated product from the database
        const updatedProduct = await CartProduct.findOne({ _id: addToCartProductId });

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found after update',
                success: false,
                error: true
            });
        }

        // Send success response with the updated product data
        res.json({
            message: 'Product Updated',
            data: updatedProduct, // Send the updated product data
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    }
};

module.exports = updateAddToCartProduct;