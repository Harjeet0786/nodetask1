const mongoose = require("mongoose");
module.exports.connect = () => {
  mongoose
    .connect("mongodb://localhost/node1")
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((e) => {
      console.log("not connected");
    });
};
