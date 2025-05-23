const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// ✅ method for generating token
loginSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Login", loginSchema);
