const express = require("express")
const User = require("../schema/schemaUser")
const routeP = express()
routeP.use(express.json())

routeP.get("/users", async (req, res) => {
  res.send(await User.find())
})

routeP.listen(8080)
