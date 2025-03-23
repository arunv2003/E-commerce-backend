const userModel = require("../../models/userModel")

const allUser = async (req, res) => {
    try {
        // console.log("userId",req.userId)
        const AllUsers=await userModel.find()
        res.json({
            message:"All User",
            success:true,
            error:false,
            data:AllUsers
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}
module.exports = allUser
