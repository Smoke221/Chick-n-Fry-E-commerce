const express = require("express")
const path = require("path")
const connection = require("./configs/db")
const {userRouter} = require("./Routes/userRoute")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/../frontend'));

app.get("/home",(req,res) => {
    try{
        res.send(res)
    }
    catch(err){
        res.send({"msg":"Something went wrong"})
    }
})

app.use("/user",userRouter)

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