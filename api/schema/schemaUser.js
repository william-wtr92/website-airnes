const mongoose = require("mongoose")
const { Schema } = mongoose
const connection = require("../dbConnect")

const UserSchema = new Schema({
  _id: Number,
  name: { type: String, required: true },
})

const User = connection.model("User", UserSchema)

module.exports = User
