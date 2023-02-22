const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    confirm_email:String,
    password:String,
    phone:Number
})

const userModel = mongoose.model("user",userSchema)

module.exports = {
    userModel
}