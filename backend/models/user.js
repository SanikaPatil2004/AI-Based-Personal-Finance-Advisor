const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String, // No hashing as per your request
});

module.exports = mongoose.model("User", UserSchema);
