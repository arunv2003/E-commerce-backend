const productsModel = require("../../models/productsModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q
        const regex = new RegExp(query,'i','g')
        const product = await productsModel.find({
            "$or": [{
                productsName :regex

            },
            {
                category :regex
            }
            ]
        })
        res.json({
            message:'ok',
            error:false,
            success:true,
            data:product
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = searchProduct