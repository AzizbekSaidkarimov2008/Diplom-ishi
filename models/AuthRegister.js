const { Schema, model } = require("mongoose");

const formSchema = new Schema({
  name: {
    type: String,
  },
  course: {
    type: String,
  },
  number: {
    type: Number,
  },
  situation: {
    type: String,
  },
  disabled: {
    type: String,
  },
  agree: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  faculty: {
    type: String,
  },
  email: {
    type: String,
  },
  room: {
    type: String,
  },
});

module.exports = model("register", formSchema);