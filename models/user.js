const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  userName: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  AuthorName: {
    type: String,
  },
  Created_By: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_At: {
    type: Date,
    required: true,
    default: Date.now,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  token: {
    type: String,
  },
});
const user = mongoose.model("user", userModel);
module.exports = user;
