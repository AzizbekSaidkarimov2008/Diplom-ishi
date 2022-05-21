const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("login", authSchema);