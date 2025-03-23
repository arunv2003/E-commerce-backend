
const uploadProductsPermission = require("../../helpers/permission")
const productsModel = require("../../models/productsModel")


const uploadProducts=async(req,res)=>{

try {
    const sessionUserId=req.userId
    if(!uploadProductsPermission(sessionUserId)){
       res.json({message:'permission denied'})
    }
    const uploadProducts=await new productsModel(req.body)
    const saveProducts=await uploadProducts.save()
    res.status(200).json({
        message:"Products upload successful",
        success:true,
        error:false,
        data:saveProducts
    })
    
} catch (error) {
    res.status(400).json({
        message: error.message || error,
        success: false,
        error: true
    })
}
}
module.exports =uploadProducts