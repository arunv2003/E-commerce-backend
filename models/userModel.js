const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 2,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true, 
        lowercase: true
    },
    password: {
        type: String
    },
    profilePic: {
        type: String
    },
    role:{
        type:String
    }
   
}, { timestamps: true })

userSchema.add({
    resetPasswordToken:{
        type:String,
        default:null
    },
})

module.exports = mongoose.model("users",userSchema)