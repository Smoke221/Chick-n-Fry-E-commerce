const mongoose = require("mongoose")

require('dotenv').config()
mongoose.set('strictQuery', false); // Set strictQuery to false
const connection = mongoose.connect(process.env.mongoURL)


module.exports = {
    connection
}