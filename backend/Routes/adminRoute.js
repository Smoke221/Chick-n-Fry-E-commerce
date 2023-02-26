const express = require("express")
const { AddModel } = require("../Models/ProductModel")
const { adminModel } = require("../Models/adminModel")
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { authenticate } = require("../middlewares/authenticate")

const adminRouter = express.Router()


adminRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ 'msg': 'Something went wrong', 'error': err.message })
            } else {
                const existingAdmin = await adminModel.findOne({ email })
                if (existingAdmin) {
                    res.send({ 'msg': 'admin already exist, please login' })
                } else {
                    const admin = new adminModel({ name, email, password: hash })
                    await admin.save()
                    res.send({ 'msg': 'new admin has been registered successfully' })
                }
            }
        })
    }
    catch (err) {
        res.send({ 'msg': 'Something went wrong', 'error': err.message })
    }
})
// Jackie Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiNjNmOTA0YjNjNWY3NmUxZWQyODJmMTE0IiwiaWF0IjoxNjc3MjY0NDcyfQ.aiYL9dNYnRL5lO2nRBoONhZnLYXuqN2GGfQHl4LobaQ
adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const admin = await adminModel.find({ email })
        if (admin.length > 0) {
            let name = admin[0].name
            bcrypt.compare(password, admin[0].password, (err, hash) => {
                if (hash) {
                    let token = jwt.sign({ adminID: admin[0]._id }, 'chick-n-fry')
                    res.send({ 'msg': 'Logged in', 'token': token, 'name':name })

                } else {
                    res.send({ 'msg': 'Wrong Password' })
                }
            })
        } else {
            res.send({ 'msg': 'Wrong credentials' })
        }
    }
    catch (err) {
        res.send({ 'msg': 'Something went wrong', 'error': err.message })
    }
})


const url = process.env.mongoURL;
const client = new MongoClient(url, { useNewUrlParser: true });

adminRouter.get("/dashboard", authenticate, async (req, res) => {
    client.connect((err) => {
        const collection = client.db("chick-n-fry").collection("breakfasts")
        collection.find({}).toArray((err, prods) => {
            try {
                res.json(prods)
            }
            catch (err) {
                console.log(err);
                res.send({ "msg": "error retrieving data from nongodb" })
            }
            client.close()
        })
    })
})


// {
//     "main_image":"https://www.cfacdn.com/img/order/menu/Online/Drinks/lemonade_pdp.png",
//     "title":"Chicken Burger",
//     "price":"15.99",
//     "calories":"250",
//     "carbs":"25g",
//     "fat":"27g",
//     "protein":"50g"
// }

adminRouter.post("/add", authenticate, async (req, res) => {
    const { id, main_image, title, price, calories, carbs, fat, protein, userID } = req.body
    const newProduct = new AddModel({ id, main_image, title, price, calories, carbs, fat, protein, userID })
    await newProduct.save()
    res.send({ "msg": "new product added" })
})

adminRouter.patch("/update/:id", authenticate, async (req, res) => {
    const payload = req.body
    const prodID = req.params.id
    try {
        await AddModel.findByIdAndUpdate({ "_id": prodID }, payload)
        res.send({ 'msg': `the product with id: ${prodID} has been updated` })
    }
    catch (err) {
        res.send({ 'msg': 'Something went wrong', 'error': err.message })
    }
})

adminRouter.delete("/delete/:id", authenticate, async (req, res) => {
    const prodID = req.params.id
    await AddModel.findByIdAndDelete({ _id: prodID })
    res.send({ 'msg': `product with the ${prodID} has been deleted` })
})

module.exports = {
    adminRouter
}