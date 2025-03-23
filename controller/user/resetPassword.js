const userModel = require("../../models/userModel")

const resetPassword = async (req, res) => {
    let token=req.params.token
    let user=await userModel.findOne({resetPasswordToken:token})
    if(user){
        res.render('resetPassword',{token})
    }
    else{
        res.send('token expire')
    }
   
}
module.exports=resetPassword