const express = require("express")
const {AddModel} = require("../Models/adminAddProduct")

const adminRouter = express.Router()


adminRouter.post("/add", async (req,res) => {
    const {id,main_image,title,price,calories,carbs,fat,protein} = req.body
    const newProduct = new AddModel({id,main_image,title,price,calories,carbs,fat,protein} )
    await newProduct.save()
    res.send({"msg":"new user added"})
})

module.exports = {
    adminRouter
}