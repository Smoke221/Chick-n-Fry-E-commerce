const express = require("express")
const path = require("path")
const connection = require("./configs/db")
const {userRouter} = require("./Routes/userRoute")
const cors = require("cors")
require('dotenv').config()
const {adminRouter} = require("./Routes/adminRoute")
const {authenticate} = require("./middlewares/authenticate")
const {breakfastRouter} = require("./Routes/breakfastRoute")
const{cartRouter} = require("./Routes/cartRoute")


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
// app.use(authenticate)
app.use("/admin",adminRouter)

app.use("/breakfast",breakfastRouter)

// app.use("/cart",cartRouter)


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