const uploadProductsPermission = require("../../helpers/permission")
const productsModel = require("../../models/productsModel")


const updateProducts = async (req, res) => {
    try {
        const sessionUserId = req.userId
        if (!uploadProductsPermission(sessionUserId)) {
            res.json({ message: 'permission denied' })
        }
        const {_id,...resBody}=req.body
        const updateProducts=await productsModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message:"product updated successful",
            error:false,
            success:true,
            data:updateProducts
        })


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports=updateProducts