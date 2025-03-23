const userModel = require("../../models/userModel")

const userDetail = async (req, res) => {
    try {
    //  console.log("useId",req.userId)
     const user=await userModel.findById(req.userId)
     res.status(200).json({
        data:user,
        error:false,success:true,
        message:"Login User Details"
     })
    

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}
module.exports=userDetail