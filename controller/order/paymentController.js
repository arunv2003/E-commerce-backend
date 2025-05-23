const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (req, res) => {
    try {
        const { cardItems } = req.body;

        const user = await userModel.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found', error: true, success: false });
        }

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'], // Start with just 'card' to test
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1RRJcW03MmAi569m4krY3lXe'
                }
            ],
            customer_email: user.email,
            line_items: cardItems.map((item, index) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item?.productId?.productsName,
                            images: Array.isArray(item.productId?.productImage)
                                ? item.productId.productImage
                                : Object.values(item.productId?.productImage || {}),
                            metadata: {
                                id: item.productId._id,
                                index: index,
                                productId: item.productId._id,
                                userId: req.userId,
                            }
                        },
                        unit_amount: item?.productId?.selling * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.FRONTEND_URL_VITE}/success`,
            cancel_url: `${process.env.FRONTEND_URL_VITE}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        res.status(303).json(session);
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = paymentController;
