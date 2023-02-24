const express = require("express")
const path = require("path")
const connection = require("./configs/db")
const {userRouter} = require("./Routes/userRoute")
const cors = require("cors")
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const {adminRouter} = require("./Routes/adminAddProduct")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res) => {
    try{
        res.send('res')
    }
    catch(err){
        res.send({"msg":"Something went wrong"})
    }
})


app.use("/user",userRouter)
app.use("/admin",adminRouter)

const url = process.env.mongoURL;
const client = new MongoClient(url, { useNewUrlParser: true });

app.get("/dashboard",(req,res) => {
    client.connect((err) => {
        const collection = client.db("chick-n-fry").collection("breakfasts")
        collection.find({}).toArray((err,prods) => {
            if(err){
                console.log(err);
                res.send({"msg":"error retrieving data from nongodb"})
            }else{
                res.json(prods)
            }
            client.close()
        })
    })
})

app.listen(process.env.port,async() => {
    try{
        await connection
        console.log(`connected to db`);
    }
    catch(err){
        console.log(err.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
})