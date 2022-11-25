const mongoose = require("mongoose");
const bookModel = new mongoose.Schema({
  BookName: {
    type: String,
  },
  BookPrice: {
    type: Number,
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
});
const book = mongoose.model("book", bookModel);
module.exports = book;
