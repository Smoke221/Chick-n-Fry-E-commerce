const express = require("express")
const { userModel } = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { authenticate } = require("../middlewares/authenticate")

const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    res.send({ "msg": "Chick-n-Fry SignUp Page" })
})

// {
//     "name":"Shreya",
//     "email":"shreya@hotmail.com",
//     "confirm_email":"shreya@hotmail.com",
//     "password":"shreya@123"
// }

userRouter.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                res.send({ 'error': err.message })
            } else {
                const existingUser = await userModel.findOne({ email })
                if (existingUser) {
                    res.send({ 'msg': 'User already exist, please login' })
                } else {
                    const user = new userModel({ firstname, lastname, email, password: hash })
                    await user.save()
                    res.send({ 'msg': 'new user has been registered',"result":"register" })
                }
            }
        });
    }
    catch (err) {
        res.send({ 'error': err.message })
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            let firstname = user[0].firstname
            bcrypt.compare(password, user[0].password, (err, hash) => {
                if (hash) {
                    let token = jwt.sign({ userID: user[0]._id}, 'chick-n-fry')
                    res.send({ 'msg': 'logged in', "token": token, "name":firstname})
                } else {
                    res.send({ 'msg': 'Wrong Password' })
                }
            });
        } else {
            res.send({ 'msg': 'Wrong Credentials' })
        }
    }
    catch (err) {
        res.send({ 'error': err.message })
    }
})


module.exports = {
    userRouter
}