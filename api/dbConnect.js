require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = connection
