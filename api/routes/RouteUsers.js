require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const User = require("../schema/schemaUser")
const routeP = express()
routeP.use(express.json())
mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})

routeP.get("/users", async (req, res) => {
  res.send(await User.find())
})

routeP.listen(8080)
