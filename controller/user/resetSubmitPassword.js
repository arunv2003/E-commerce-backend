const userModel = require("../../models/userModel")
const bcrypt = require("bcryptjs");

const resetSubmitPassword = async (req, res) => {
    try {
        let token = req.params.token
        let { newPassword } = req.body
        let user = await userModel.findOne({ resetPasswordToken: token })
        if (user) {
            const salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(newPassword, salt);
            user.password = hashPassword
            user.resetPasswordToken=null
            await user.save()
            res.json({
                message: "password updated successful",
                success: true,
                error: false
            })
        }
        else {
            res.json({
                message: "token expired",
                success: false,
                error: true
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = resetSubmitPassword