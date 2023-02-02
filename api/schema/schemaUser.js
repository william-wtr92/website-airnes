const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
  _id: Number,
  name: { type: String, required: true },
})

const User = mongoose.model("User", UserSchema)

module.exports = User
