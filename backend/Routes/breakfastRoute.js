const express = require("express")
const { authenticate } = require("../middlewares/authenticate")
const { AddModel } = require("../Models/ProductModel")

const breakfastRouter = express.Router()

breakfastRouter.get("/", async (req,res) => {
    try{
        const breakfast = await AddModel.find({})
        res.send(breakfast)
    }
    catch(err){
        res.send({"error":err.message})
    }
})

module.exports = {
    breakfastRouter
}