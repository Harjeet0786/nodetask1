const jwt = require("jsonwebtoken");
require("dotenv").config();

function sign(payload) {
  return jwt.sign(payload, process.env.secret_key);
}
function verify(token) {
  try {
    token = token.replace("Bearer", "");
    token = token.replace(" ", "");
    var decoded = jwt.verify(token, process.env.secret_key);
    console.log(decoded);
    return decoded;
  } catch (e) {
    return null;
  }
}
module.exports = {
  sign,
  verify,
};
