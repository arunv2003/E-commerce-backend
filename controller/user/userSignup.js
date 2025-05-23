const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const register =async(req, res) => {
    try {
        const {name,email, password,profilePic }=req.body


        console.log(name,email, password,profilePic)

        if (!name) {
            return res.json({ message: "name is required", success: false });
        }
        if (!email) {
            return res.json({ message: "your email is required", success: false });
        }
        if (!password) {
            return res.json({ message: "password is required", success: false });
        }

        let findUser = await userModel.findOne({ email });
        if (findUser) {
            return res.json({ message: "user already exists", success: false });
        }
        const salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(password, salt);
        

        if (!hashPassword) {
            return res.status(400).json({
                message: "something is wrong",
                error: true,
                success: false
            });
        }

        let data = await userModel.create({  // Fixed model name
            name,
            email,
            password:hashPassword,
            profilePic,
            role:"GENERAL"
        });

        res.status(200).json({ message: "user registered successfully", success: true, user: data });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = register;
