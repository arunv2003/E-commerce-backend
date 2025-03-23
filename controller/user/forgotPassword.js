const userModel = require("../../models/userModel")
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            let randomToken = randomstring.generate(30);
            user.resetPasswordToken = randomToken;
            await user.save()
            res.json({
                message: "please check your email for update your password",
                success: true,
                error: false
            })
            //  let updateUser=await userModel.findByIdAndUpdate(user?._id,{resetPasswordToken:randomToken})
            const mail = await sendMail(email, randomToken)
        }
        else {
            res.json("user not found")
        }
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    }

}
function sendMail(email, randomToken) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "vermakumararun2003@gmail.com",
            pass: "jywl vxyv gnja qvqg",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maddison StoreA$Store 👻" <vermakumararun2003@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Password Reset", // Subject line
            text: `Please click the link below to choose a new password: \n "http://localhost:5001/api/randomToken/${randomToken}"`, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}
module.exports = forgotPassword