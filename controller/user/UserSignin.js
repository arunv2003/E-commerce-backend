const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.json({ message: "your email is required", success: false });
        }
        if (!password) {
            return res.json({ message: "password is required", success: false });
        }

        const user = await userModel.findOne({ email })
        if (!user) {
           return res.json({
                message: "user not found",
                success: false,
                error: true
            })
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (checkPassword) {
             const TokenData={
                _id:user._id,
                email:user.email
             }
            const token = await jwt.sign(TokenData,process.env.TOKEN_SECRET_VITE, { expiresIn: 60 * 60 *8 });
            const tokenOption={
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,tokenOption).json({
                message:"login Successful",
                success:true,
                error:false,
                data:token,
                data:user

            })
        }
        else {
            res.json({
                message: "wrong password",
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
module.exports = login